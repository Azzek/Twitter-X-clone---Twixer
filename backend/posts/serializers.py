from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','title','body','date','price','town','image','category','author','email','number']
        
        def create(self, validated_data):
            post = Post.objects.create(**validated_data)
            return post