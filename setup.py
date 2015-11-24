# -*- coding: utf-8 -*-
from setuptools import setup

name = "bulbs-component-quiz"
version = "0.0.4"

requires = [
    "django-bulbs==0.6.22",
    "django-jsonfield==0.9.15"
]

dev_requires = [
    "virtualenv==13.0.3"
]

setup(
    name=name,
    version=version,
    description="Quiz component for bulbs.",
    license="MIT",
    author="Andrew Kos",
    author_email="akos@theonion.com",
    package_dir={
        "bulbs_component_quiz": "src/django-bulbs",
        "bulbs_component_quiz_public": "src/django-bulbs-public",
        "bulbs_component_quiz_cms": "compat-builds/django-bulbs-cms"
    },
    packages=[
        "bulbs_component_quiz",
        "bulbs_component_quiz_public",
        "bulbs_component_quiz_cms"
    ],
    include_package_data=True,
    install_requires=requires,
    extras_require={
        "dev": dev_requires
    }
)
