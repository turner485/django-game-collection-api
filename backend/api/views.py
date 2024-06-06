from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from games.models import Games
from .serializers import GamesSerializer
from collections import defaultdict
from django.http import Http404

# Utility function to remove spaces from dictionary keys
def remove_spaces_from_keys(d):
    if isinstance(d, dict):
        return {k.replace(" ", "_").lower(): remove_spaces_from_keys(v) for k, v in d.items()}
    elif isinstance(d, list):
        return [remove_spaces_from_keys(i) for i in d]
    else:
        return d

class GamesAPIView(APIView):

    def get(self, request, *args, **kwargs):
        games = Games.objects.all()
        platforms = defaultdict(list)

        for game in games:
            serialized_game = GamesSerializer(game).data
            platforms[game.platform].append(serialized_game)

        # Remove spaces from the platform keys
        platforms_no_spaces = remove_spaces_from_keys(platforms)
        
        # Wrap in top-level "platforms" key
        response_data = {"platforms": platforms_no_spaces}

        return Response(response_data)

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

    def get_object(self, pk):
        try:
            return Games.objects.get(pk=pk)
        except Games.DoesNotExist:
            raise Http404
