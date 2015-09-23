from rest_framework import routers

from .viewsets import QuizViewSet, QuizAnswerViewSet, QuizOutcomeViewSet, QuizQuestionViewSet

router = routers.DefaultRouter(trailing_slash=True)
router.register("quizzes", QuizViewSet, "quiz")
router.register("answers", QuizAnswerViewSet, "answer")
router.register("outcome", QuizOutcomeViewSet, "outcome")
router.register("question", QuizQuestionViewSet, "question")
