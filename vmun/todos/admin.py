from django.contrib import admin

from .models import SubItem, Item, Table, Board, Workspace


admin.site.register(SubItem)
admin.site.register(Item)
admin.site.register(Table)
admin.site.register(Board)
admin.site.register(Workspace)
