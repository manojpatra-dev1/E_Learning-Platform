from rest_framework import viewsets, permissions
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Student.objects.all()
        class_name = self.request.query_params.get('class_name')
        if class_name:
            qs = qs.filter(class_name__iexact=class_name)
        return qs