from rest_framework import generics, permissions, filters
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer, FollowSerializer, UserProfileSerializer
from .models import UserProfile
from rest_framework.views import APIView


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer
    
    def perform_create(self, serializer):
        print(self.request.data)
        user = serializer.save()
        # user = User.objects.get(username=self.request.data['username'])
        user.set_password(self.request.data['password'])
        user.save()
        UserProfile.objects.create(user=user, username=user.username, id=user.id, email=user.email)
        

class DetailsUserWithId(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserProfileSerializer
    queryset =  UserProfile.objects.all()
    
    lookup_field = 'pk'
    
    
class DetailsUserWithUsername(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserProfileSerializer
    lookup_field = 'username'
    
    def get_object(self):
        queryset = UserProfile.objects.all()
        filter_kwargs = {self.lookup_field: self.kwargs[self.lookup_field]}
        obj = generics.get_object_or_404(queryset, **filter_kwargs)
        return obj

class Follow(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = FollowSerializer

class UserSearchView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username']
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
        
        
        
        
    
    
        