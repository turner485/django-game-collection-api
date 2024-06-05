from django.views.generic import ListView

from .models import Games


class GamesListView(ListView):
    model = Games
    template_name = "game_list.html"
