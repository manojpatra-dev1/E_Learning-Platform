from django.db import models


class StudentProfile(models.Model):
    user_id = models.IntegerField()
    roll_no = models.CharField(max_length=20, blank=True)
    class_name = models.CharField(max_length=20, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    added_by_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"user_id {self.user_id} - {self.roll_no}"