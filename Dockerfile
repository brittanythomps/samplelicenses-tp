FROM ubuntu:16.04

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 8AA7AF1F1091A5FD && \
    echo 'deb http://repo.sawtooth.me/ubuntu/1.0/stable xenial universe' >> /etc/apt/sources.list && \
    apt-get update

RUN apt-get install -y -q sawtooth-sdk

WORKDIR /samplelicenses-tp

ENV PATH $PATH:/samplelicenses-tp

CMD ['index.js']
