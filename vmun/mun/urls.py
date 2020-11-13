from django.urls import path

from . import views

urlpatterns = [
    path('api/confs/', views.ConferenceListView.as_view(), name="conferences"),
    path('api/conf/<slug:slug>/', views.ConferenceAPIView.as_view(), name="conference-detail"),
    path('api/cmtes/', views.CommitteeListView.as_view(), name="committees"),
    path('api/cmte/<slug:slug>/', views.CommitteeAPIView.as_view(), name="committee-detail"),
    path('api/dels/', views.DelegateListView.as_view(), name="delegates"),
    path('api/del/<slug:slug>/', views.DelegateAPIView.as_view(), name="delegate-detail")
]
