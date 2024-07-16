from django.db import models
from django.contrib.auth.models import User
from . import trends

class Post(models.Model):
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=None, related_name='posts')
    author_name = models.CharField(max_length=18, default='Unknown Author')    
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        words = self.body.split(" ")
        trends.create_trends_for_words(words)
        
    def __str__(self):
        return self.body    

class Trend(models.Model):
    name = models.CharField(max_length=255, unique=True)
    count = models.IntegerField(default=0)

    def __str__(self):
        return self.name
    
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    image = models.ImageField(null=True)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body