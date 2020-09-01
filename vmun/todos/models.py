from django.db import models


class Todo(models.Model):
    stat_choices = (
        ('done', 'Done'),
        ('working_on_it', 'Working on it'),
        ('stuck', 'Stuck'),
        ('not_started', 'Not Started'),
    )
    diff_choices = (
        ('easy', 'Easy'),
        ('normal', 'Normal'),
        ('demon', 'Demon'),
        ('unrated', 'Unrated'),
    )
    name = models.CharField(max_length=50)
    status = models.CharField(max_length=13, choices=stat_choices, default=stat_choices[3][0])
    intensity = models.CharField(max_length=7, choices=diff_choices, default=diff_choices[3][0])
    notes = models.TextField(max_length=150, blank=True)
    created_at = models.DateField(auto_now_add=True)
    due_on = models.DateField()

    def __str__(self):
        display = self.name if len(self.name) < 28 else self.name[:28] + '...'
        return "(" + str(self.id) + ") " + self.name
