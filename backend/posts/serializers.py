from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','body','date','image','author', 'author_name']
        
        def create(self, validated_data):
            post = Post.objects.create(**validated_data)
            post.save()
            return post