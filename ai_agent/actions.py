from accounts.models import User
from student.models import StudentProfile
from django.db.models import Q, IntegerField
from django.db.models.functions import Cast


def generate_unique_username(base_username):
    username = base_username
    counter = 1
    while User.objects.filter(username=username).exists():
        username = f"{base_username}{counter}"
        counter += 1
    return username


def add_student(name, roll_no, class_name, phone, added_by_id):
    base_username = f"{name.lower().replace(' ', '')}{roll_no}"
    username = generate_unique_username(base_username)
    password = f"{username}12"

    user = User.objects.create(username=username, first_name=name, role=User.Role.STUDENT)
    user.set_password(password)
    user.save()

    StudentProfile.objects.create(
        user_id=user.id, roll_no=roll_no, class_name=class_name,
        phone=phone, added_by_id=added_by_id,
    )
    return {"username": username, "password": password, "name": name, "roll_no": roll_no}


def bulk_add_student(students, added_by_id):
    created = []
    for s in students:
        result = add_student(
            s.get("name", "Unknown"), s.get("roll_no", ""),
            s.get("class_name", ""), s.get("phone", ""), added_by_id,
        )
        created.append(result)
    return created


# ---- Generic, future-proof search ----

ALLOWED_FIELDS = {
    "roll_no": "roll_no",
    "class_name": "class_name",
    "phone": "phone",
}

# Common synonyms an LLM might reasonably use instead of the exact field name.
FIELD_ALIASES = {
    "roll": "roll_no", "roll_number": "roll_no", "rollno": "roll_no", "roll_num": "roll_no",
    "class": "class_name", "class_no": "class_name", "grade": "class_name", "std": "class_name",
    "mobile": "phone", "contact": "phone", "phone_number": "phone", "phone_no": "phone",
    "student_name": "name", "full_name": "name", "first_name": "name",
}

ALLOWED_LOOKUPS = {
    "exact", "iexact", "icontains", "contains", "startswith", "endswith",
    "istartswith", "iendswith", "gte", "lte", "gt", "lt", "in", "regex", "iregex",
}

# roll_no/class_name are text columns, but "greater than"/"less than" should
# be numeric, not alphabetical. These lookups get redirected to an
# integer-cast version of the column.
NUMERIC_LOOKUPS = {"gt", "gte", "lt", "lte"}
NUMERIC_FIELD_MAP = {"roll_no": "roll_no_int", "class_name": "class_name_int"}


def search_students(filters=None, logic="AND"):
    """
    filters: list of dicts like
        {"field": "phone", "lookup": "icontains", "value": ["6372701543", "9124929858"]}
        {"field": "roll_no", "lookup": "gte", "value": "100"}
        {"field": "name", "lookup": "icontains", "value": "raj"}
    logic: "AND" or "OR" between different filter dicts
    """
    filters = filters or []
    logic = logic or "AND"
    queryset = StudentProfile.objects.annotate(
        roll_no_int=Cast("roll_no", output_field=IntegerField()),
        class_name_int=Cast("class_name", output_field=IntegerField()),
    )
    combined_q = Q()
    name_filter = None

    for f in filters:
        field = f.get("field")
        field = FIELD_ALIASES.get(field, field)
        lookup = f.get("lookup", "icontains")
        value = f.get("value")

        if field not in ALLOWED_FIELDS and field != "name":
            continue
        if lookup not in ALLOWED_LOOKUPS or value in (None, "", []):
            continue

        if field == "name":
            name_filter = (lookup, value)
            continue

        db_field = ALLOWED_FIELDS[field]
        if lookup in NUMERIC_LOOKUPS and db_field in NUMERIC_FIELD_MAP:
            db_field = NUMERIC_FIELD_MAP[db_field]

        values = value if isinstance(value, list) else [value]

        field_q = Q()
        if lookup == "in":
            field_q |= Q(**{f"{db_field}__in": values})
        else:
            for v in values:
                field_q |= Q(**{f"{db_field}__{lookup}": v})

        combined_q = (combined_q & field_q) if logic == "AND" else (combined_q | field_q)

    if name_filter:
        lookup, value = name_filter
        values = value if isinstance(value, list) else [value]
        name_q = Q()
        for v in values:
            name_q |= Q(**{f"first_name__{lookup}": v})
        matching_user_ids = list(User.objects.filter(name_q).values_list("id", flat=True))

        user_q = Q(user_id__in=matching_user_ids)
        combined_q = (combined_q & user_q) if logic == "AND" else (combined_q | user_q)

    if filters:
        queryset = queryset.filter(combined_q)

    results = []
    for s in queryset:
        user = User.objects.filter(id=s.user_id).first()
        if not user:
            continue
        results.append({
            "id": s.id, "username": user.username,
            "name": user.first_name, "roll_no": s.roll_no,
            "class_name": s.class_name, "phone": s.phone,
        })
    return results


def reset_password(student_id):
    profile = StudentProfile.objects.get(id=student_id)
    user = User.objects.get(id=profile.user_id)
    new_password = f"{user.username}12"
    user.set_password(new_password)
    user.save()
    return {"username": user.username, "new_password": new_password}


def get_student_count():
    return {"total_students": StudentProfile.objects.count()}


