from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=None, related_name='posts')
    author_name = models.CharField(max_length=18, default='Unknown Author')    
    
    def __str__(self):
        return self.body    