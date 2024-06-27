from rest_framework import generics, permissions
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    
    def perform_create(self, serializer):
        user = serializer.save()
        user = User.objects.get(username=self.request.data['username'])
        user.set_password(self.request.data['password'])
        user.save()

class DetailsUser(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer
    queryset = User.objects.all()
    # def get_queryset(self):
    #     user = self.request.user
    #     return User.objects.filter(author=user)
    
        