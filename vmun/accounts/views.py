from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.views import View

from rest_framework import generics

from . import forms
from . import models
from . import serializers


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
        return JsonResponse({'username': user.username})
    else:
        return JsonResponse({'username': None})


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
