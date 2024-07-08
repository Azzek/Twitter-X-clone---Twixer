from rest_framework import viewsets, permissions
from .serializers import PostSerializer
from rest_framework import generics
from .models import Post
from rest_framework.response import Response
from rest_framework import status

class PostsList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]
    
class PostsCreate(generics.CreateAPIView):
    serializer_class = PostSerializer   
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author_name=self.request.user.username, author=self.request.user)
    
    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)
        
class PostDetails(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PostSerializer

class UserPostList(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        username = self.kwargs.get('username')
        return Post.objects.filter(author_name=username)
    
class DeletePosts(generics.DestroyAPIView):
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    
    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)
        