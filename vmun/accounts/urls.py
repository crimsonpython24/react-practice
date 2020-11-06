from django.urls import path, include
from django.contrib.auth.views import LogoutView

from . import views

urlpatterns = [
    path('logout', LogoutView.as_view(), name='logout'),
    path('ajaxlogin', views.ajax_login, name='ajaxlogin'),
    path('teststate', views.test_state, name='teststate'),
    path('initstate', views.init_state, name='initstate'),
]
