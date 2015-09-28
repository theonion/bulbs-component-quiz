from django.conf.urls import patterns, include, url

from bulbs_component_quiz.routers import router

urlpatterns = patterns(
    '',
    url(r"api/", include(router.urls, namespace="api")),
)
