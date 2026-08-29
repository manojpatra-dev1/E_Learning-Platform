from django.db import models


class TeacherProfile(models.Model):
    user_id = models.IntegerField()
    subject = models.CharField(max_length=100, blank=True)
    department = models.CharField(max_length=100, blank=True)
    qualification = models.CharField(max_length=100, blank=True)
    joined_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"user_id {self.user_id} - {self.subject}"