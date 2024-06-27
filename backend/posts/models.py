from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=75, null=False)
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    price = models.CharField(max_length=15, null=False, default='free')
    town = models.CharField(max_length=15, null=False, default=None)
    image = models.ImageField(default="fallback.png")
    category = models.CharField(default='any', null=False, max_length=15)
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    email = models.EmailField(max_length=254, null=True)
    number = models.CharField(max_length=9, null=True)
    
    def __str__(self):
        return self.title