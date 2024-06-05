from django.urls import path

from .views import GamesListView

urlpatterns = [
    path("", GamesListView.as_view(), name="home"),
]
