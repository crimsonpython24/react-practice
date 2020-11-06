import os
import json

from django.contrib.auth import authenticate, login
from django.http import JsonResponse

from rest_framework import generics

from accounts.models import User


def ajax_login(request):
    if request.is_ajax():
        post_data = json.load(request)
        username = post_data['username']
        password = post_data['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

        data = {
            'login': user is not None,
            'username': user.username
        }
        return JsonResponse(data)


def test_state(request):
    user = os.environ.get('TESTUSER_ID')  # undefined
    if user is not None:
        username = getattr(User.objects.get(id=user), 'slug')
        return JsonResponse({'user': {'username': username, 'id': int(user)}})
    else:
        return JsonResponse({'user': {'username': 'guest_8000', 'id': -1}})


def init_state(request):
    user = None
    if request.user and request.user.is_anonymous == False:
        userid = request.user.id

        if userid is not None:
            username = getattr(User.objects.get(id=userid), 'slug')
            user = {'username': username, 'id': int(userid)}
        
    if user:
        return JsonResponse({'user': user})
    else:
        return JsonResponse({'user': {'username': 'guest', 'id': -1}})
