from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, HttpResponseRedirect

from . import forms


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
        return HttpResponse(
            user.username + """
            <a href="/accounts/logout">This is a test link</a>
            """
        )
    else:
        return HttpResponse("ERROR: found nothing get tf out")

