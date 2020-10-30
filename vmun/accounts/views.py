import sys
import os
import json

from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.views import View
from django.core import serializers as dj_serializers
from django.core.serializers.json import DjangoJSONEncoder

from rest_framework import generics

from . import forms
from . import models
from . import serializers

from accounts.models import User


def logintest(request):
    if request.method == 'POST':
        form = forms.LoginForm(request.POST)
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect('/accounts/profiletest')
        else:
            # Return an 'invalid login' error message.
            return HttpResponse('you failed')
    else:
        form = forms.LoginForm()

    return render(request, 'test.html', {'form': form})


def profile(request):
    user = request.user
    if user is not None:
        return JsonResponse({'authenticated': True, 'id': user.id})
    else:
        return JsonResponse({'username': None})


def me(request):
    print(os.environ.get('TESTUSER_ID'))
    user = os.environ.get('TESTUSER_ID')
    if user is not None:
        return JsonResponse({'authenticated': True, 'id': user})
    else:
        return JsonResponse({'authenticated': False, 'id': None})


def teststate(request):
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


@method_decorator(ensure_csrf_cookie, name='dispatch')
class UserLoginView(View):
    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'success': True, 'userid': user.id})
            else:
                return JsonResponse({'success': False, 'errors': 'user not found'})

        return JsonResponse({'success': False, 'errors': form.errors})


class UserBaseAPIView(generics.ListCreateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

    def get_objects(self):
        return models.User.objects.all()
