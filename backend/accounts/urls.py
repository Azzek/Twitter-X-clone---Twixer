from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='login'),
    path('id/<int:pk>/', views.DetailsUserWithId.as_view(), name='id'),
    path('user-profile/<str:username>/', views.DetailsUserWithUsername.as_view(), name='username'),
    path('register/', views.CreateUserView.as_view(), name='register'),
    path('follow/', views.Follow.as_view(), name='folllow'),
    path('search/', views.UserSearchView.as_view(), name='search-username'),
    path('test-token/', TokenRefreshView.as_view(), name='test_token'),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("auth/", include("rest_framework.urls")),
    
]
