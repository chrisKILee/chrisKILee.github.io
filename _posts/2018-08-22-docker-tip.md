---
layout: post
title:  "Docker Tips"
subtitle: "이미지·컨테이너 기본부터 Compose·멀티스테이지까지"
author: chris
avatar: "img/authors/profile.png"
image: "img/docker.png"
featured: false
categories : [all, Tip]
---

> 컨테이너 한 줄 요약: "내 컴퓨터에선 됐는데요"를 없애주는 기술. 이미지(설계도) → 컨테이너(실행체)의 흐름만 잡으면 절반은 끝난다.

# 설치

```bash
# macOS / Windows → Docker Desktop 설치
brew install --cask docker        # macOS

# Ubuntu (공식 스크립트)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER     # sudo 없이 쓰려면 (재로그인 필요)

# 설치 확인
docker --version
docker run hello-world
```

# 핵심 개념

| 용어 | 설명 |
|------|------|
| Image | 실행에 필요한 모든 것을 담은 읽기 전용 템플릿(설계도) |
| Container | 이미지를 실행한 격리된 프로세스(실행체) |
| Dockerfile | 이미지를 만드는 레시피 |
| Registry | 이미지 저장소 (Docker Hub 등) |
| Volume | 컨테이너 외부에 데이터를 영속 저장 |

# 이미지 다루기

```bash
docker images                         # 로컬 이미지 목록
docker pull nginx:latest              # 이미지 받기
docker rmi nginx:latest               # 이미지 삭제
docker image prune                    # dangling 이미지 정리
docker search redis                   # Docker Hub 검색
```

# 컨테이너 기본 (원본 팁 확장)

```bash
# docker 안의 image 확인
docker images

# 기본 container 생성 (-itd: 인터랙티브 + 백그라운드)
docker run --name=_NAME_ -itd _IMAGE_ bash

# 포트 매핑 + 백그라운드 실행
docker run -d --name web -p 8080:80 nginx

# container 접속
docker exec -it _NAME_ bash

# container 목록 (실행 중)
docker ps
docker ps -a                          # 정지된 것까지 전체

# container 정지 / 재시작 / 삭제
docker container stop _NAME_
docker container start _NAME_
docker container rm _NAME_
docker rm -f _NAME_                    # 실행 중이어도 강제 삭제

# 로그 확인
docker logs -f web                    # -f: 실시간 follow
```

## 이미지 커밋 & 태그 (원본 팁)

```bash
# 이미지 변경 사항 새 버전으로 반영
docker commit -m "_MESSAGE_" _CONTAINER_NAME_ _IMAGE_NAME_:_IMAGE_VERSION_

# 새로 변경된 이미지를 최신 태그로 변경
docker tag _IMAGE_NAME_:_IMAGE_VERSION_ _IMAGE_NAME_:latest
```

## 실전 예시 (원본)

```bash
chris$ ssh user@192.168.1.15            # VM 접속
$ docker images                         # image 확인
$ docker run --name=chrisGwcomm01 -itd vgateway:latest bash  # container 생성
$ docker container ls                    # 만들어진 container 확인
$ docker exec -it chrisGwcomm01 bash     # container 접속
```

# Dockerfile — 이미지 만들기

```dockerfile
# Node.js 앱 예시
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t myapp:1.0 .            # 빌드 (-t: 태그)
docker run -d -p 3000:3000 myapp:1.0  # 실행
```

## 멀티스테이지 빌드 (advanced) — 이미지 경량화

빌드 도구는 최종 이미지에서 제외해 용량을 크게 줄인다.

```dockerfile
# 1단계: 빌드
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# 2단계: 실행 (빌드 결과물만 복사)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

# 볼륨 & 네트워크

```bash
# 볼륨 (데이터 영속)
docker volume create pgdata
docker run -d -v pgdata:/var/lib/postgresql/data postgres:16

# 호스트 디렉토리 마운트 (개발 시 코드 실시간 반영)
docker run -v $(pwd):/app -w /app node:20 npm run dev

# 네트워크 (컨테이너 간 통신)
docker network create appnet
docker run -d --name db --network appnet postgres:16
docker run -d --name api --network appnet myapi   # db 라는 호스트명으로 접근
```

# Docker Compose — 여러 컨테이너 한 번에

```yaml
# docker-compose.yml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  api:
    build: .
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://postgres:secret@db:5432/app
    ports:
      - "3000:3000"

volumes:
  pgdata:
```

```bash
docker compose up -d          # 백그라운드 실행
docker compose ps             # 상태
docker compose logs -f api    # 특정 서비스 로그
docker compose down           # 정지 + 제거
docker compose down -v        # 볼륨까지 제거
```

# 정리 & 디버깅 (자주 쓰는 advanced)

```bash
# 안 쓰는 리소스 한 번에 정리 (용량 회복)
docker system prune -a            # 미사용 이미지·컨테이너·네트워크 전부
docker system df                  # 디스크 사용량 확인

# 컨테이너 내부 상태 확인
docker stats                      # 실시간 CPU/메모리
docker inspect <name>             # 상세 정보(JSON)
docker exec -it <name> sh         # 내부 셸 진입

# 컨테이너 ↔ 호스트 파일 복사
docker cp <name>:/app/log.txt ./log.txt
docker cp ./config.json <name>:/app/
```

> 💡 자주 막히는 포인트: 포트는 `-p 호스트:컨테이너` 순서, 데이터가 사라지면 볼륨 미설정, 컨테이너끼리 통신 안 되면 같은 네트워크인지 확인.
