from django.db import models


class Todo(models.Model):
    name = models.CharField(max_length=100)
    complete = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "(" + str(self.id) + ") " + self.name
