from django.urls import path, include
from django.contrib.auth.views import LogoutView

from . import views

from frontend import views as f_views

urlpatterns = [
    path('logout', LogoutView.as_view(), name='logout'),
    path('ajaxlogin', views.ajax_login, name='ajaxlogin'),
    path('ajaxlogout', views.ajax_logout, name='ajaxlogout'),
    path('ajaxsignup', views.ajax_logout, name='ajaxsignup'),
    path('teststate', views.test_state, name='teststate'),
    path('initstate', views.init_state, name='initstate'),

    path('login', f_views.index, name='index'),
    path('signup', f_views.index, name='index'),
]
