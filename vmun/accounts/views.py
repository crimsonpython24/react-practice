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


def test_state(request):
    user = os.environ.get('TESTUSER_ID')  # undefined
    if user is None:
        return JsonResponse({'user': {'username': 'guest_8000', 'id': -1, "authenticated": False}, 'conferences': []})
    
    username = getattr(User.objects.get(id=user), 'slug')
    confs = Conference.objects.filter(creator=user)

    # TODO also cut sensitive data
    confz = [ConferenceSerializer(instance=conf).data for conf in confs]
    return JsonResponse({'user': {'username': username, 'id': int(user), "authenticated": True}, 'conferences': confz})


def init_state(request):
    user = None
    if request.user and request.user.is_anonymous == False:
        userid = request.user.id

        if userid is not None:
            # TODO remove password, sensitive data, things the user won't want to see e.g. perms
            user = UserSerializer(instance=User.objects.get(id=userid)).data
            user['authenticated'] = True
    
    # TODO also include user conferences as described in teststate
    if user:
        return JsonResponse({'user': user, 'conferences': []})
    else:
        return JsonResponse({'user': {'username': 'guest'}, 'conferences': []})
