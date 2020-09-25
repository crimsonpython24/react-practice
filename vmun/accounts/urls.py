from django.urls import path, include
from django.contrib.auth.views import LogoutView

from . import views

urlpatterns = [
    path('logout', LogoutView.as_view(), name='logout'),
    path('logintest', views.logintest, name='logintest'),
    path('profiletest', views.profile, name='profiletest'),
    path('newprofile', views.me, name='newprofile'),
    path('teststate', views.teststate, name='teststate'),
    path('initstate', views.init_state, name='initstate'),
    path('api/user/', views.UserBaseAPIView.as_view(), name="users"),
]
