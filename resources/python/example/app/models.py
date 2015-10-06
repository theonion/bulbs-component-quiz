from django.db import models

from bulbs_component_quiz.models import Quiz as BaseQuiz
from bulbs_compontent_quiz.models import QuizQuestion as BaseQuizQuestion
from bulbs_compontent_quiz.models import QuizAnswer as BaseQuizAnswer
from bulbs_compontent_quiz.models import QuizOutcome as BaseQuizOutcome


class Quiz(BaseQuiz):
    body = models.TextField(blank=True, default="")


class QuizQuestion(BaseQuizQuestion):
    body = models.TextField(blank=True, default="")


class QuizAnswer(BaseQuizAnswer):
    body = models.TextField(blank=True, default="")


class QuizOutcome(BaseQuizOutcome):
    body = models.TextField(blank=True, default="")
