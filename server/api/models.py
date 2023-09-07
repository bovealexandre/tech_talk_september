from django.db import models

# Create your models here.
class Room(models.model):
    code = models.Charfield(max_length=8, default="", unique=True)
    host = models.CharField(max_length=50, unique=True)
    quest_can_pause= models.BooleanField(null=False, default=False)
    votes_to_skip= models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)