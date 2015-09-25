from django.conf.urls import patterns, include, url

# TODO
import importlib
mod = importlib.import_module('src.django-bulbs.routers')

urlpatterns = patterns(
    '',
    url(r"api/", include(mod.router.urls, namespace="api")),
)
