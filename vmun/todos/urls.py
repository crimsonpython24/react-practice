from django.urls import path
from . import views

urlpatterns = [
    path('api/todo/', views.TodoListCreate.as_view(), name="todos"),
    path('api/todo/<int:id>/', views.TodoView.as_view(), name="todo-detail"),
]
