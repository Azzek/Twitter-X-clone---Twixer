from rest_framework import viewsets, permissions
from .serializers import PostSerializer
from rest_framework import generics
from .models import Post

class PostsList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]
    
class PostsCreate(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer   
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
class PostDetails(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PostSerializer


    
    