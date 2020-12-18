import os
import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token

from accounts.models import User
from mun.models import Conference
from .serializers import UserSerializer
from mun.serializers import ConferenceSerializer


@ensure_csrf_cookie
def ajax_get_csrf(request):
    csrf_token = get_token(request)
    print(csrf_token)
    return JsonResponse({'csrftoken': csrf_token})


def ajax_login(request):
    if request.is_ajax():
        try:
            post_data = json.load(request)
            username = post_data['username']
            password = post_data['password']
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)

            # pick appropriate data here (for user)
            userdata = {
                'authenticated': user is not None,
                'username': user.username,
                'email': user.email,
            }
            return JsonResponse(userdata)
        # be more specific on exception
        except:
            # also work on the error messages
            return JsonResponse({'authenticated': False, 'errors': {'inv_credentials': 'Invalid credentials provided'}})


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
    csrf_token = get_token(request)
    user_id = os.environ.get('TESTUSER_ID')  # undefined
    if user_id is None:
        return JsonResponse({'user': {'username': 'guest_8000', 'id': -1, "authenticated": False}, 'conferences': []})

    confz = [ConferenceSerializer(instance=conf).data for conf in Conference.objects.filter(creator=user_id)]
    user = UserSerializer(instance=User.objects.get(id=user_id)).data
    user['authenticated'] = True
    return JsonResponse({'user': user, 'conferences': confz, 'csrftoken': csrf_token})


@ensure_csrf_cookie
def init_state(request):
    user = None
    csrf_token = get_token(request)
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
        return JsonResponse({'user': user, 'conferences': confz, 'csrftoken': csrf_token})
    else:
        return JsonResponse({'user': {'username': 'guest'}, 'conferences': [], 'csrftoken': csrf_token})


# lambda this
def get_user_id(request):
    if request.user and request.user.is_anonymous == False:
        return request.user.id
    return os.environ.get('TESTUSER_ID') or None  # take care of edge case later


# only allow post methods
def ajax_profile(request):
    if request.is_ajax():
        # exceptions later
        post_data = json.load(request)
        email = post_data['email']
        uid = get_user_id(request)

        # update fields using **kwargs
        User.objects.filter(pk=uid).update(email=email)

        return JsonResponse({'email': email})

    return JsonResponse({'email': ''})
