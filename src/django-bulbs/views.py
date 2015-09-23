from .models import Quiz

from bulbs.content.views import BaseContentDetailView


class QuizDetailView(BaseContentDetailView):

    model = Quiz
