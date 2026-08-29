import ast
import os
from django.conf import settings

ACTIONS_FILE = os.path.join(settings.BASE_DIR, "ai_agent", "actions.py")

DANGEROUS = [
    "os.system", "subprocess", "eval(", "exec(", "__import__",
    ".objects.all().delete()", "shutil.rmtree", "open(",
]

def append_function_to_actions(code: str):
    # 1. dangerous keywords check — syntax check se PEHLE karo
    if any(d in code for d in DANGEROUS):
        raise ValueError("Generated code contains disallowed operations")

    # 2. syntax check — garbage code file me mat likho
    ast.parse(code)

    # 3. ab hi file me likho
    with open(ACTIONS_FILE, "a", encoding="utf-8") as f:
        f.write("\n\n" + code + "\n")