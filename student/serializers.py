from rest_framework import serializers
from .models import StudentProfile
from accounts.models import User


class StudentProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = StudentProfile
        fields = ['id', 'username', 'name', 'roll_no', 'class_name', 'phone']

    def get_username(self, obj):
        user = User.objects.filter(id=obj.user_id).first()
        return user.username if user else ""

    def get_name(self, obj):
        user = User.objects.filter(id=obj.user_id).first()
        return user.first_name if user else ""