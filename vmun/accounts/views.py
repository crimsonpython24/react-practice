import os
import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.forms.models import model_to_dict


from accounts.models import User
from mun.models import Conference
from .serializers import UserSerializer
from mun.serializers import ConferenceSerializer


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


def ajax_logout(request):
    if request.is_ajax():
        logout(request)
        return JsonResponse({'logout': True})


def ajax_signup(request):
    if request.is_ajax():
        post_data = json.load(request)
        username = post_data['username']
        first_name = post_data['first_name']
        last_name = post_data['last_name']
        email = post_data['email']
        password = post_data['password']
        gender = post_data['gender']
        birthday = post_data['birthday']
        create_user(username, email=email, password=password, first_name=first_name, last_name=last_name, gender=gender, birthday=birthday)
        
        return JsonResponse({'signed_up': True})

    return JsonResponse({'signed_up': False})


def test_state(request):
    user = os.environ.get('TESTUSER_ID')  # undefined
    if user is None:
        return JsonResponse({'user': {'username': 'guest_8000', 'id': -1, "authenticated": False}, 'conferences': []})
    
    username = getattr(User.objects.get(id=user), 'slug')
    confs = Conference.objects.filter(creator=user)

    confz = [ConferenceSerializer(instance=conf).data for conf in confs]
    return JsonResponse({'user': {'username': username, 'id': int(user), "authenticated": True}, 'conferences': confz})


def init_state(request):
    user = None
    if request.user and request.user.is_anonymous == False:
        userid = request.user.id

        if userid is not None:
            user = UserSerializer(instance=User.objects.get(id=userid)).data
            user['authenticated'] = True
            remove = ('password')  # rest are all necessary?
            for entry in remove:
                user.pop(entry, None)
    
    if user:
        confz = [ConferenceSerializer(instance=conf).data for conf in Conference.objects.filter(creator=userid)]
        return JsonResponse({'user': user, 'conferences': confz})
    else:
        return JsonResponse({'user': {'username': 'guest'}, 'conferences': []})
