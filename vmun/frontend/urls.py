from django.views.generic import TemplateView
from django.urls import path

from .views import index

urlpatterns = [
    # path('', TemplateView.as_view(template_name="build/index.html"), name='index'),
    path('', index, name='index'),
    path('welcome', index, name='index'),
    path('feedback', index, name='index'),

    # All the development links will be moved after backends are complete
    path('development', index, name='index'),
    path('development/chats', index, name='index'),
    path('development/todos', index, name='index'),
    path('development/blank', index, name='index'),
]
