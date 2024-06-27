from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.PostsList.as_view(), name='posts_list'),
    path('new-post/', views.PostsCreate.as_view(), name='create_post'),
    path('post/<int:pk>', views.PostDetails.as_view(), name='post')
]
