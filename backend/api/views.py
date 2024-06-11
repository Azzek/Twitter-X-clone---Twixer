from django.shortcuts import render
from django.contrib.auth import login, authenticate, logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.core.exceptions import ValidationError
from django.views.decorators.http import require_POST
import json
from .models import Post
from .forms import PostForm
from django.contrib.auth.models import User

@require_POST
def login_view(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"detail": "Invalid JSON format"}, status=400)

    username = data.get("username")
    password = data.get("password")

    if username is None or password is None     :
        return JsonResponse({"detail": "Please provide username and password!"}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({"detail": "Invalid credentials"}, status=400)

    login(request, user)
    return JsonResponse({"detail": "Successfully logged in!"})

def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "You're not logged in!"}, status=400)

    logout(request)
    return JsonResponse({"detail": "Successfully logged out!"})

@require_POST
def register_view(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"detail": "Invalid JSON format"}, status=400)

    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if not username or not password or not email:
        return JsonResponse({"detail": "Please provide username, password, and email!"}, status=400)

    if User.objects.filter(username=username).exists():
        return JsonResponse({"detail": "Username already taken!"}, status=400)

    if User.objects.filter(email=email).exists():
        return JsonResponse({"detail": "Email already registered!"}, status=400)

    try:
        user = User.objects.create_user(username=username, password=password, email=email)
        user.full_clean()  # Validate the user instance
        user.save()
    except ValidationError as e:
        return JsonResponse({"detail": "Invalid data", "errors": e.messages}, status=400)

    login(request, user)
    return JsonResponse({"detail": "Successfully registered and logged in!"})


@ensure_csrf_cookie
def session_view(request):
    return JsonResponse({"is_authenticated": request.user.is_authenticated})

@require_POST
@ensure_csrf_cookie
def add_post(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "Authentication required"}, status=403)

    form = PostForm(request.POST, request.FILES)
    if form.is_valid():
        new_post = form.save(commit=False)
        new_post.author = request.user
        new_post.save()
        return JsonResponse({"detail": "Post created successfully"})
    else:
        return JsonResponse({"detail": "Please provide title, description, and image"}, status=400)

