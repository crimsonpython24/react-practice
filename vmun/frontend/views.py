# from django.views.generic import TemplateView
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_protect, csrf_exempt


# @csrf_exempt
@ensure_csrf_cookie
@csrf_protect
def index(request):
    user = None
    if request.user and request.user.is_anonymous == False:
        userid = request.user.id
    
    print('USER ', request.user.username)
    print(type(request.user.username))

    return render(request, 'build/index.html', {'user': request.user.username + "test"})
