# from django.views.generic import TemplateView
from django.shortcuts import render


def index(request):
    user = None
    if request.user and request.user.is_anonymous == False:
        userid = request.user.id
    
    print('USER ', request.user.username)
    print(type(request.user.username))

    return render(request, 'build/index.html', {'user': request.user.username + "test"})
