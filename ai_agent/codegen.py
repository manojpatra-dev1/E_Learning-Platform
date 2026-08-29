import re
from .groq_service import ask_groq_text  # niche define kar rahe hain, plain text ke liye

CODEGEN_PROMPT = """
You are a Python code generator for a Django app.
Existing helper functions live in ai_agent/actions.py and use these Django models:
- StudentProfile(user_id, roll_no, class_name, phone, added_by_id) - app: student.models
- TeacherProfile(user_id, subject, department, qualification) - app: teacher.models
- User(username, first_name, role) - app: accounts.models

Task: {task}

Write ONE Python function that does this. Rules:
- Function name must be short, lowercase, underscore_separated (e.g. delete_student)
- Only use the models listed above
- Import statements must be included at the top if needed
- Return a dict describing the result (never return a queryset directly)
- No comments, no explanation text, ONLY the function code
- Do not redefine helper functions like generate_unique_username, reuse them if needed

Output format (return ONLY this, nothing else):
```python
def function_name(param1, param2, ...):
    ...
```
"""

def generate_function_code(task_description: str) -> tuple[str, str]:
    """Returns (function_name, full_code_string)"""
    raw = ask_groq_text(CODEGEN_PROMPT.format(task=task_description))

    match = re.search(r"```python\s*(.*?)```", raw, re.DOTALL)
    code = match.group(1).strip() if match else raw.strip()

    name_match = re.search(r"def\s+(\w+)\s*\(", code)
    if not name_match:
        raise ValueError("LLM did not return a valid function definition")

    return name_match.group(1), code