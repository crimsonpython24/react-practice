from django.contrib import admin

from .models import Todo, TodoSubitem


admin.site.register(Todo)
admin.site.register(TodoSubitem)
