from rest_framework import viewsets

from .models import Quiz, QuizAnswer, QuizOutcome, QuizQuestion
from .serializers import *


class QuizViewSet(viewsets.ModelViewSet):
    model = Quiz
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuizAnswerViewSet(viewsets.ModelViewSet):
    model = QuizAnswer
    queryset = QuizAnswer.objects.all()
    serializer_class = QuizAnswerSerializer


class QuizOutcomeViewSet(viewsets.ModelViewSet):
    model = QuizOutcome
    queryset = QuizOutcome.objects.all()
    serializer_class = QuizOutcomeSerializer


class QuizQuestionViewSet(viewsets.ModelViewSet):
    model = QuizQuestion
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer
