from rest_framework.views import APIView
from rest_framework.response import Response
from games.models import Games
from .serializers import GamesSerializer
from collections import defaultdict


class GamesAPIView(APIView):

    def get(self, request, *args, **kwargs):
        games = Games.objects.all()
        platforms = defaultdict(list)

        for game in games:
            serialized_game = GamesSerializer(game).data
            platforms[game.platform].append(serialized_game)

        return Response(platforms)
