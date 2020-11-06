from django.views.generic import TemplateView
from django.urls import path

from .views import index

urlpatterns = [
    # path('', TemplateView.as_view(template_name="build/index.html"), name='index'),
    path('', index, name='index'),
    path('welcome', index, name='index')
]

# if path is not part of the "ajax url", return index e.g. accounts/
# check if urlpatterns, accounts should be searched first