from django.urls import path
from .views import main, data

urlpatterns = [
    path('', main),
    path('datas', data)
]
