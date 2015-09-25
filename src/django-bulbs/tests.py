import json

from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse
from django.test import TestCase

from rest_framework.test import APIClient
from rest_framework_jwt import utils as jwt_utils


User = get_user_model()


class QuizTests(TestCase):

    quiz = reverse('api:quiz-list')
    answer = reverse('api:answer-list')
    outcome = reverse('api:outcome-list')
    question = reverse('api:question-list')

    def setUp(self):
        self.client = APIClient()
        admin = User.objects.create_user("admin", "secret")
        admin.email = "person@theonion.com"
        admin.is_staff = True
        admin.save()
        payload = jwt_utils.jwt_payload_handler(admin)
        token = jwt_utils.jwt_encode_handler(payload)
        auth = 'JWT ' + token
        self.client.defaults['HTTP_AUTHORIZATION'] = auth

    def test_create_quiz(self):
        data = {
            "title": "What's your favorite hat?",
            "feature_type": "Quiz",
            "question_set": [],
            "outcome_set": []
        }

        response = self.client.post(
            self.quiz, json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 201)

    def test_create_update_quiz(self):
        data = {
            "title": "What's your favorite hat?",
            "feature_type": "Quiz",
            "question_set": [],
            "outcome_set": []
        }

        response = self.client.post(
            self.quiz, json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 201)

        quiz_data = response.data
        quiz_id = response.data["id"]

        # start adding quiz stuff
        outcome_data = []
        question_data = []
        answer_data = []

        # add outcomes
        response = self.client.post(self.outcome, json.dumps({
            "quiz": quiz_id,
            "title": "Baseball",
            "body": "Baseball hat is your favorite hat."
        }), content_type="application/json")
        self.assertEqual(response.status_code, 201)

        outcome_data.append(response.data)
        baseball = response.data["id"]

        response = self.client.post(self.outcome, json.dumps({
            "quiz": quiz_id,
            "title": "Basketball",
            "body": "Basketball hat is your favorite hat."
        }), content_type="application/json")
        self.assertEqual(response.status_code, 201)

        outcome_data.append(response.data)
        basketball = response.data["id"]

        # add question
        response = self.client.post(self.question, json.dumps({
            "quiz": quiz_id,
            "body": "Which sport do you like?",
            "answer_set": []
        }), content_type="application/json")
        self.assertEqual(response.status_code, 201)

        question_data.append(response.data)
        question = response.data["id"]

        # add answers
        response = self.client.post(self.answer, json.dumps({
            "question": question,
            "body": "Baseball.",
            "outcome": baseball
        }), content_type="application/json")
        self.assertEqual(response.status_code, 201)

        answer_data.append(response.data)

        response = self.client.post(self.answer, json.dumps({
            "question": question,
            "body": "Basketball.",
            "outcome": basketball
        }), content_type="application/json")
        self.assertEqual(response.status_code, 201)

        answer_data.append(response.data)

        # set stuff to quiz data & PUT
        question_data[0]["answer_set"] = answer_data
        quiz_data["outcome_set"] = outcome_data
        quiz_data["question_set"] = question_data

        # Compontents shouldn't have awareness of Sections
        # # sections required on put
        # section = Section.objects.create(name="Quiz")
        # quiz_data["section"] = {"id": section.id}

        response = self.client.put(
            reverse("api:quiz-detail", kwargs={"pk": quiz_id}),
            json.dumps(quiz_data),
            content_type="application/json")
        self.assertEqual(response.status_code, 200)
