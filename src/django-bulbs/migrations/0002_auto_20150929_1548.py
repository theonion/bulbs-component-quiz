# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('django-bulbs', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quiz',
            name='id',
        ),
        migrations.RemoveField(
            model_name='quizanswer',
            name='id',
        ),
        migrations.RemoveField(
            model_name='quizoutcome',
            name='id',
        ),
        migrations.RemoveField(
            model_name='quizquestion',
            name='id',
        ),
        migrations.AddField(
            model_name='quiz',
            name='_quiz_id',
            field=models.AutoField(default=1, serialize=False, primary_key=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='quizanswer',
            name='_quiz_answer_id',
            field=models.AutoField(default=1, serialize=False, primary_key=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='quizoutcome',
            name='_quiz_outcome_id',
            field=models.AutoField(default=1, serialize=False, primary_key=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='quizquestion',
            name='_quiz_question_id',
            field=models.AutoField(default=1, serialize=False, primary_key=True),
            preserve_default=False,
        ),
    ]
