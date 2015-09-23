from django.db import models

from bulbs.content.models import ElasticsearchImageField


"""Quiz styles:
     * Multiple choice: pick one answer per question. Outcome is
       determined by question.outcome with highest frequency.
     * Tally: One question, a ton of answers. User chooses as many
       as they'd like. Outcome is determined by number of answers.
     * Test: Like multiple choice except there are right and wrong
       responses. Outcome is determined by number of correct answers.
     * Cosmode: Many questions, each answer is assigned a number of
       points. Outcomes are determined by number of points at end.
"""

QUIZ_STYLE = (
    ("multiple", "Open Ended"),
    ("tally", "One Question"),
    ("test", "Scored Test"),
    ("cosmo", "Cosmode"),  # a mix of tally and multiple-choice
)


class Quiz(models.Model):
    quiz_style = models.CharField(max_length=20, choices=QUIZ_STYLE, default=QUIZ_STYLE[0][0])
    show_all_answers = models.BooleanField(
        default=True,
        help_text="Immediately show all answers for test-style quizzes upon selection.")
    result_button_text = models.CharField(max_length=512, blank=True, default="")

    def get_template(self):
        return "quiz/partials/quiz_{}_detail.html".format(self.quiz_style)


class QuizQuestion(models.Model):
    """Represents one quiz question with many answers."""
    quiz = models.ForeignKey("Quiz", related_name="question_set")

    # post_answer_body gets displayed immediately after the question is answered
    post_answer_body = models.TextField(blank=True, default="")

    class Meta:
        order_with_respect_to = "quiz"


class QuizAnswer(models.Model):
    """An answer to a particular quiz question."""
    question = models.ForeignKey("QuizQuestion", related_name="answer_set")

    # for "test" type
    is_correct = models.BooleanField(default=False)
    explanation = models.TextField(blank=True, default="")

    # for "multiple" type
    outcome = models.ForeignKey(
        "QuizOutcome",
        related_name="answer_set",
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    # for "tally" type
    points = models.IntegerField(blank=True, default=1)

    class Meta:
        order_with_respect_to = "question"

    class Mapping:
        detail_image = ElasticsearchImageField()


class QuizOutcome(models.Model):
    """A potential result for a quiz."""
    quiz = models.ForeignKey("Quiz", related_name="outcome_set")

    title = models.TextField(blank=True, default="")
    shareable = models.BooleanField(default=False)

    # for "tally" & "quiz" types
    min_score = models.IntegerField(blank=True, default=0)

    # require_perfect indicates the outcome may only be selected if 100% of the
    # user's answers point to it.
    require_perfect = models.BooleanField(default=False)

    class Meta:
        order_with_respect_to = "quiz"

    class Mapping:
        detail_image = ElasticsearchImageField()
