from django.views.generic import TemplateView
from django.urls import path

from .views import index

urlpatterns = [
    # path('', TemplateView.as_view(template_name="build/index.html"), name='index'),
    path('', index, name='index')
]
