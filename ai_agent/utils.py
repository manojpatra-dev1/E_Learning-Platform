import random, string
from accounts.models import User
from student.models import StudentProfile


def generate_unique_username(base_username):
    """if the base_username already exists, append a random number to make it unique."""
    username = base_username
    counter = 1
    while User.objects.filter(username=username).exists():
        username = f"{base_username}{counter}"
        counter += 1
    return username


def create_student_user(name, roll_no, class_name, phone, added_by):
    base_username = f"{name.lower().replace(' ', '')}{roll_no}"
    username = generate_unique_username(base_username)
    password = f"{username}12"

    user = User.objects.create(
        username=username,
        first_name=name,
        role=User.Role.STUDENT,
    )
    user.set_password(password)
    user.save()

    StudentProfile.objects.create(
        user_id=user.id,
        roll_no=roll_no,
        class_name=class_name,
        phone=phone,
        added_by_id=added_by.id if added_by else None,
    )
    return {"username": username, "password": password, "name": name, "roll_no": roll_no}


