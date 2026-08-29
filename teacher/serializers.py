from accounts.models import User


class TeacherRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True, min_length=6)
    phone = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = TeacherProfile
        fields = ['username', 'email', 'password', 'phone', 'subject', 'department', 'qualification']

    def create(self, validated_data):
        user = User(
            username=validated_data.pop('username'),
            email=validated_data.pop('email'),
            phone=validated_data.pop('phone', ''),
            role=User.Role.TEACHER,
        )
        user.set_password(validated_data.pop('password'))
        user.save()

        teacher_profile = TeacherProfile.objects.create(user=user, **validated_data)
        return teacher_profile