from rest_framework import serializers
from .models import Post, Trend, Comment, Like

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'body', 'date', 'image', 'author', 'author_name', 'likes', 'comments']
        
        # def create(self, validated_data):
        #     post = Post.objects.create(**validated_data)
        #     post.save()
        #     return post     
class TrendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trend
        fields = '__all__'
        
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'post', 'created_at']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'body', 'created_at']
        read_only_fields = ['user']
