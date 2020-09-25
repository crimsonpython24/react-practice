from django.db import models
from django.utils.translation import gettext_lazy as _

from accounts.models import User


class TodoSubitem(models.Model):
    stat_ch = [
        ('done', 'Done'),
        ('in progress', 'In Progress'),
        ('stuck', 'Stuck'),
        ('not started', 'Not Started'),
    ]
    int_ch = [
        ('demon', 'Demon'),
        ('normal', 'Normal'),
        ('easy', 'Easy'),
        ('unrated', 'Unrated'),
    ]
    title = models.CharField(_('Title'), max_length=50)
    source = models.CharField(_('Source'), blank=True, max_length=30)
    status = models.CharField(_('status'), choices=stat_ch, max_length=20)
    intensity = models.CharField(_('intensity'), choices=int_ch, max_length=20)
    notes = models.TextField(_('Notes'), blank=True, max_length=120)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        c_title = self.title if len(self.title) < 50 else self.title[:47]
        return str(self.id) + ': ' + c_title


class Todo(models.Model):
    stat_ch = [
        ('done', 'Done'),
        ('in progress', 'In Progress'),
        ('stuck', 'Stuck'),
        ('not started', 'Not Started'),
    ]
    int_ch = [
        ('demon', 'Demon'),
        ('normal', 'Normal'),
        ('easy', 'Easy'),
        ('unrated', 'Unrated'),
    ]
    title = models.CharField(_('Title'), max_length=50)
    source = models.CharField(_('Source'), blank=True, max_length=30)
    status = models.CharField(_('status'), choices=stat_ch, max_length=20)
    intensity = models.CharField(_('intensity'), choices=int_ch, max_length=20)
    notes = models.TextField(_('Notes'), blank=True, max_length=120)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        c_title = self.title if len(self.title) < 50 else self.title[:47]
        return str(self.id) + ': ' + c_title
    due_date = models.DateField(_('Due Date'), auto_now_add=True)
    completed = models.BooleanField(_('Completed'), default=False)
    subitems = models.ManyToManyField(TodoSubitem, related_name=_('Subitems'), blank=True, null=True)

    def __str__(self):
        c_title = self.title if len(self.title) < 50 else self.title[:47]
        return str(self.id) + ': ' + c_title
