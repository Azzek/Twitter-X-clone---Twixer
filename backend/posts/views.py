from rest_framework import viewsets, permissions
from .serializers import PostSerializer, TrendSerializer, LikeSerializer, CommentSerializer
from rest_framework import generics
from .models import Post, Trend, Like, Comment
from rest_framework.response import Response
from rest_framework import status

class PostsList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class PostsCreate(generics.CreateAPIView):
    serializer_class = PostSerializer   
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author_name=self.request.user.username, author=self.request.user)
        
    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)
        
class PostDetails(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    permission_classes = [permissions.IsAuthenticated]
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
        
class TrendsListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TrendSerializer
    
    def get_queryset(self):
        return Trend.objects.all().order_by('-count')[:8]

class LikeCreate(generics.CreateAPIView):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post_id = self.kwargs.get('post_id')
        post = generics.get_object_or_404(Post, id=post_id)
        if Like.objects.filter(user=self.request.user, post=post).exists():
            raise ValidationError({'detail': 'Already liked'})
        serializer.save(user=self.request.user, post=post)

class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class CommentDestroyView(generics.DestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Comment.objects.filter(user=self.request.user)        

class CommentList(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        return Comment.objects.filter(post_id=post_id)

class CommentDetail(generics.RetrieveDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(user=self.request.user)