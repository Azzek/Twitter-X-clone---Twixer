from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.PostsList.as_view(), name='posts-list'),
    path('new-post/', views.PostsCreate.as_view(), name='create-post'),
    path('post/<int:pk>/', views.PostDetails.as_view(), name='post'),
    path('posts/<str:username>/', views.UserPostList.as_view(), name='user-posts'),
    path('delete/<int:pk>/', views.DeletePosts.as_view(), name='delete-post'),
    path('trends/list/', views.TrendsListView.as_view(), name='trends-list'),
    path('new-comment/', views.CommentCreateView.as_view(), name='create-comment'),
    path('delete-comment/', views.CommentDestroyView.as_view(), name='create-comment')
]
