from django.urls import path
from .views import MyTeacherProfileView, TeacherListView, TeacherRegisterView

urlpatterns = [
    path('register/', TeacherRegisterView.as_view(), name='teacher-register'),   # naya
    path('profile/', MyTeacherProfileView.as_view(), name='teacher-profile'),
    path('list/', TeacherListView.as_view(), name='teacher-list'),
]