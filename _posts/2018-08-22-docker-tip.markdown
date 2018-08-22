---
title:  "Docker Tips"
subtitle: "Docker 기본 사용법"
author: "Chris Lee"
avatar: "img/authors/profile.png"
image: "img/docker.png"
date:   2018-08-22 12:00:00
categories : [all, Tip]
---

ex VM info>
`Vgateway`	`192.168.1.15`

```bash
# docker 안의 image 확인
docker images

# 기본 container 생성
docker run --name=_NAME_  -itd _IMAGE_ bash


# container 접속
docker exec -it _NAME_ bash


# container 정지
docker container stop _NAME_


# 정지된 container 재시작
docker container start _NAME_


# 정지된 container 삭제
docker container rm _NAME_
```

ex>
```bash
chris$ ssh daliworks@192.168.1.15 #VM 접속

$ docker images # image 확인

$ docker run --name=chrisGwcomm01 -itd vgateway:latest  bash #container 생성

$ docekr container ls #만들어진 container 확인

$ docker exec -it chrisGwcomm01 bash #container에 접속

```