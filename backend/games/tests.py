from django.test import TestCase
from django.urls import reverse

from .models import Games


class GamesModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.game = Games.objects.create(
            title="Test Game",
            platform="Test Platform",
            release_date="2023-01-01",
            developer="Test Developer",
            publisher="Test Publisher",
            genre="Test Genre",
        )

    def test_game_content(self):
        self.assertEqual(self.game.title, "Test Game")
        self.assertEqual(self.game.platform, "Test Platform")
        self.assertEqual(self.game.release_date, "2023-01-01")
        self.assertEqual(self.game.developer, "Test Developer")
        self.assertEqual(self.game.publisher, "Test Publisher")
        self.assertEqual(self.game.genre, "Test Genre")

    def test_game_list_view(self):
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Test Game")
        self.assertTemplateUsed(response, "game_list.html")
