from django.urls import path

from .views import GamesAPIView

urlpatterns = [
    path("", GamesAPIView.as_view(), name="game_list"),
]
