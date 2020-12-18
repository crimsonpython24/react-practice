# from django.views.generic import TemplateView
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse


@ensure_csrf_cookie
def index(request):
    print('USER ', request.user.username)
    print(type(request.user.username))

    return render(request, 'build/index.html', {'user': request.user.username + "test"})
    # return HttpResponse("Please access the site through port 3000")
  