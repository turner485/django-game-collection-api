from django.urls import path
from .views import GamesAPIView, GameDetailAPIView

urlpatterns = [
    path('', GamesAPIView.as_view(), name='games-list'),
    path('<int:pk>/', GameDetailAPIView.as_view(), name='game-detail'),
]
