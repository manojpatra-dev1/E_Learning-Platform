from django.db import models


class AIAction(models.Model):
    action_name = models.CharField(max_length=50, unique=True)      # e.g. "add_student"
    description = models.TextField()                                  # AI ko action pehchanne ke liye
    extraction_prompt = models.TextField()                            # data nikalne wala prompt, {text} placeholder ke sath
    function_path = models.CharField(max_length=200)                  # e.g. "ai_agent.actions.add_student"
    is_active = models.BooleanField(default=True)
    empty_text_response = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.action_name