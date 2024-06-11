from django.contrib import admin
from django.urls import path, include, re_path
from . import views
from django.conf.urls.static import static 
from django.conf import settings 
from django.views.static import serve

urlpatterns = [
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('session/', views.session_view, name='logout'),
    path('register/', views.register_view, name='register')
]
