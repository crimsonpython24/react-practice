from django.urls import path
from . import views


urlpatterns = [
    path('api/', views.TodoListCreate.as_view() ),
]