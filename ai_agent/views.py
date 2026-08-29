from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .agent import AIAgent


class IsTeacherOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['teacher', 'admin']


class AgentView(APIView):
    """
   A single endpoint handles everything. The frontend can either specify the action_name (for the fast path) or leave it empty, allowing the AI to decide the appropriate action automatically.
    """
    permission_classes = [IsTeacherOrAdmin]

    def post(self, request):
        text = request.data.get("text", "")
        action_name = request.data.get("action")  # this is  optional
        extra = {"added_by_id": request.user.id, "student_id": request.data.get("student_id")}

        agent = AIAgent()
        try:
            result = agent.run(text, action_name=action_name, extra_positional_data=extra)
        except Exception as e:
            return Response(
                {"error": f"AI request failed: {str(e)}"},
                status=503,
            )
        return Response(result, status=200)