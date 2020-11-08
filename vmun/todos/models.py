from django.db import models
from django.utils.translation import gettext_lazy as _

from .model_choices import status_choices, color_choices


# Modeled after my custom Monday.com tasks
# Currently: restricted to one user, no sharing opened yet
class Workspace(models.Model):
    title = models.CharField(_('title'), max_length=50)
    description = models.TextField(_('description'), max_length=300, blank=True)
    favorite = models.BooleanField(_('favorite'), default=False)


class Board(models.Model):
    title = models.CharField(_('title'), max_length=100)
    description = models.TextField(_('description'), max_length=500, blank=True)
    starred = models.BooleanField(_('starred'), default=False)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)


class Table(models.Model):
    title = models.CharField(_('title'), max_length=75)
    collapse = models.BooleanField(_('collapse'), default=False)
    color = models.CharField(_('color'), max_length=10, choices=color_choices, blank=True)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)


class Item(models.Model):
    title = models.CharField(_('title'), max_length=50)
    source = models.CharField(_('source'), max_length=20, blank=True)
    description = models.TextField(_('description'), max_length=100, blank=True)
    status = models.CharField(_('status'), max_length=10, choices=status_choices, blank=True)
    date = models.DateField(_('date'), auto_now_add=False, blank=True)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)


class SubItem(models.Model):
    title = models.CharField(_('title'), max_length=50)
    description = models.TextField(_('description'), max_length=100, blank=True)
    status = models.CharField(_('status'), max_length=10, choices=status_choices, blank=True)
    date = models.DateField(_('date'), auto_now_add=False, blank=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
