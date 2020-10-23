from django.contrib import admin

from .models import Conference, Committee, Delegate


admin.site.register(Conference)
admin.site.register(Committee)
admin.site.register(Delegate)