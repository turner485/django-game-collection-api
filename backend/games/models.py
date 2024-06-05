from django.db import models


class Games(models.Model):
    title = models.CharField(max_length=100)
    platform = models.CharField(max_length=100)
    release_date = models.DateField()
    developer = models.CharField(max_length=100)
    publisher = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)

    def __str__(self):
        return self.title
