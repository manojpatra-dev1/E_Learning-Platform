import importlib
import inspect
from .models import AIAction
from .groq_service import ask_groq
from .writer import append_function_to_actions
from .codegen import generate_function_code





class AIAgent:
    """
    This class does not know about any hardcoded function or prompt.
    Everything is dynamically loaded from the database (AIAction table).
    """

    def decide_action(self, text):
        """Based on the active actions in the database, the AI decides which one to run"""
        actions = AIAction.objects.filter(is_active=True)
        options = "\n".join([f'- "{a.action_name}": {a.description}' for a in actions])

        prompt = f"""
        You are an action classifier. Based on the user's text, pick ONE action_name from this list:
        {options}

        Return ONLY valid JSON in this format: {{"action_name": "..."}}

        Text: "{text}"
        """
        result = ask_groq(prompt)
        return result.get("action_name")

    def run(self, text, action_name=None, extra_positional_data=None):
        if not action_name:
            action_name = self.decide_action(text)

        action = AIAction.objects.filter(action_name=action_name, is_active=True).first()

        if not action:
            # === yahi tumhara "code nahi hai toh generate kar" wala part hai ===
            func_name, code = generate_function_code(text)
            append_function_to_actions(code)

            action = AIAction.objects.create(
                action_name=func_name,
                description=f"Auto-generated for: {text}",
                extraction_prompt='Extract parameters as JSON for: "{text}"',
                function_path=f"ai_agent.actions.{func_name}",
                is_active=True,
            )

        # ... baaki purana logic same (extract data, importlib.reload, call function)
        module_path, fn = action.function_path.rsplit(".", 1)
        module = importlib.import_module(module_path)
        importlib.reload(module)  # zaroori: file abhi-abhi change hui hai
        func = getattr(module, fn)

        import inspect
        params = list(inspect.signature(func).parameters.keys())
        extra_positional_data = extra_positional_data or {}
        filled_prompt = action.extraction_prompt.format(text=text)
        extracted_data = ask_groq(filled_prompt) if text.strip() else {}

        args = [extra_positional_data.get(p, extracted_data.get(p)) for p in params]
        result = func(*args)
        return {"action": action.action_name, "result": result, "auto_generated": action.description.startswith("Auto-generated")}