from rest_framework.views import APIView
from rest_framework import status
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

    def post(self, request, *args, **kwargs):
        serializer = GamesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        game = self.get_object(pk)
        game.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)