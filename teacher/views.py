from rest_framework.response import Response
from .serializers import TeacherRegisterSerializer


class TeacherRegisterView(generics.CreateAPIView):
    serializer_class = TeacherRegisterSerializer
    permission_classes = [permissions.AllowAny]   # login se pehle registration hoga

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        teacher_profile = serializer.save()
        return Response(
            {
                "message": "Teacher registered successfully",
                "teacher_id": teacher_profile.id,
                "username": teacher_profile.user.username,
            },
            status=201
        )