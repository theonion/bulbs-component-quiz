# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('quiz_style', models.CharField(default=b'multiple', max_length=20, choices=[(b'multiple', b'Open Ended'), (b'tally', b'One Question'), (b'test', b'Scored Test'), (b'cosmo', b'Cosmode')])),
                ('show_all_answers', models.BooleanField(default=True, help_text=b'Immediately show all answers for test-style quizzes upon selection.')),
                ('result_button_text', models.CharField(default=b'', max_length=512, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='QuizAnswer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('is_correct', models.BooleanField(default=False)),
                ('explanation', models.TextField(default=b'', blank=True)),
                ('points', models.IntegerField(default=1, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='QuizOutcome',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.TextField(default=b'', blank=True)),
                ('shareable', models.BooleanField(default=False)),
                ('min_score', models.IntegerField(default=0, blank=True)),
                ('require_perfect', models.BooleanField(default=False)),
                ('quiz', models.ForeignKey(related_name='outcome_set', to='django-bulbs.Quiz')),
            ],
        ),
        migrations.CreateModel(
            name='QuizQuestion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('post_answer_body', models.TextField(default=b'', blank=True)),
                ('quiz', models.ForeignKey(related_name='question_set', to='django-bulbs.Quiz')),
            ],
        ),
        migrations.AddField(
            model_name='quizanswer',
            name='outcome',
            field=models.ForeignKey(related_name='answer_set', on_delete=django.db.models.deletion.SET_NULL, blank=True, to='django-bulbs.QuizOutcome', null=True),
        ),
        migrations.AddField(
            model_name='quizanswer',
            name='question',
            field=models.ForeignKey(related_name='answer_set', to='django-bulbs.QuizQuestion'),
        ),
        migrations.AlterOrderWithRespectTo(
            name='quizquestion',
            order_with_respect_to='quiz',
        ),
        migrations.AlterOrderWithRespectTo(
            name='quizoutcome',
            order_with_respect_to='quiz',
        ),
        migrations.AlterOrderWithRespectTo(
            name='quizanswer',
            order_with_respect_to='question',
        ),
    ]
