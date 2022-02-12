# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

CMD [ "python3", "application.py" ]

