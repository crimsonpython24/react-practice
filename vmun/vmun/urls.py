from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('', include('mun.urls')),
    path('accounts/', include('accounts.urls')),
    path('development/todos/', include('todos.urls')),
]
