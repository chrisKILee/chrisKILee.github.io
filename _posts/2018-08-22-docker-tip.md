---
layout: post
title:  "Docker Tips"
subtitle: "Docker 기본 사용법"
author: "Chris Lee"
avatar: "img/authors/profile.png"
image: "img/docker.png"
featured: false
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

# 이미지 변경 사항 새 버전으로 반영
docker commit -m "_MESSAGE_" _CONTAINER_NAME_ _IAMGE_NAME_:_IMAGE_VERSION_


# 새로 변경된 이미지를 최신 이미지 태그로 변경
docker tag _IMAGE_NAME_:_IMAGE_VERSION_ _IMAGE_NAME_:latest

```

ex>
```bash
chris$ ssh daliworks@192.168.1.15 #VM 접속

$ docker images # image 확인

$ docker run --name=chrisGwcomm01 -itd vgateway:latest  bash #container 생성

$ docker container ls #만들어진 container 확인

$ docker exec -it chrisGwcomm01 bash #container에 접속

```