from rest_framework import serializers
from django.shortcuts import get_list_or_404
import re
from django.contrib.auth.models import User
from .models import UserProfile, Follow

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'date_joined',]
        extra_kwargs = {
            'password': {'write_only': True},
            'date_joined':{'read_only': True}
        }

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Password must be at least 6 characters long!")
        if not re.search(r"[A-Z]", value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        return value
        
    def validate_username(self, value):
        if len(value) < 4:
            raise serializers.ValidationError("username must be at least 4 characters long!")
        return value
        
    def create(self, validated_data):
            user = User.objects.create_user(**validated_data)
            return user
        
class UserProfileSerializer(serializers.ModelSerializer):
    blocked_users = serializers.SerializerMethodField()
    
    class Meta:
        model = UserProfile
        fields = '__all__'
        
    def get_blocked_users(self, obj):
        blocked = Blocked.objects.filter(first_user=obj)
        return [b.second_user.user.id for b in blocked]

        
class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'
            
from rest_framework import serializers
from .models import Blocked

class BlockedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blocked
        fields = ['first_user', 'second_user']