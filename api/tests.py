from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from games.models import Games


class APITests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.game = Games.objects.create(
            title="test",
            platform="PC",
            release_date="2024-12-05",
            developer="test dev",
            publisher="test pub",
            genre="test genre",
        )

    def test_api_listview(self):
        response = self.client.get(reverse("game_list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Games.objects.count(), 1)
        self.assertContains(response, self.game)
