from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='login'),
    path('user/<int:pk>', views.DetailsUser.as_view(), name='user'),
    path('register/', views.CreateUserView.as_view(), name='register'),
    path('test-token/', TokenRefreshView.as_view(), name='test_token'),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("auth/", include("rest_framework.urls")),
]
    