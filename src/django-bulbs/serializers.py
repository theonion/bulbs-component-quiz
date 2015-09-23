from rest_framework import serializers

from nested_serializers import NestedModelSerializer

from .models import Quiz, QuizAnswer, QuizOutcome, QuizQuestion


class QuizAnswerSerializer(NestedModelSerializer):
    _order = serializers.IntegerField(required=False)

    class Meta:
        model = QuizAnswer


class QuizOutcomeSerializer(NestedModelSerializer):
    _order = serializers.IntegerField(required=False)

    class Meta:
        model = QuizOutcome


class QuizQuestionSerializer(NestedModelSerializer):
    answer_set = QuizAnswerSerializer(many=True, required=False)
    _order = serializers.IntegerField(required=False)

    class Meta:
        model = QuizQuestion


class QuizSerializer(NestedModelSerializer):
    question_set = QuizQuestionSerializer(many=True, required=False)
    outcome_set = QuizOutcomeSerializer(many=True, required=False)

    class Meta:
        model = Quiz
