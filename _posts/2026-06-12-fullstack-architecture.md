---
layout: post
title:  "풀스택 아키텍처 가이드"
subtitle: "NestJS · React · TypeScript · Prisma · PostgreSQL · Docker"
author: chris
avatar: "img/authors/profile.png"
image: "img/fullstack.svg"
featured: true
categories : [all, architecture, fullstack]
---

> 💻 **인터랙티브 전체 가이드(아키텍처 SVG·전체 코드 포함):** [Dev Guide · 풀스택 아키텍처 →](/dev-guide/fullstack_architecture.html)

React 프론트엔드 → NestJS API → Prisma ORM → PostgreSQL, 그리고 전체를 Docker로 묶는 표준 구성. 각 레이어의 역할과 연결 방식을 정리한다.

# 전체 구조

```text
브라우저  →  React SPA  →  NestJS API  →  Prisma  →  PostgreSQL
(사용자)     (TS·Vite)     (REST/로직)    (ORM)      (데이터)
└──────────────  전체 Docker 컨테이너로 격리 실행  ──────────────┘
```

응답은 역방향으로: PostgreSQL → Prisma → NestJS → React → 브라우저.

# 레이어별 역할

| 레이어 | 역할 |
|--------|------|
| **React + TS** | 컴포넌트 기반 UI, 상태 관리·라우팅·API 호출. TypeScript로 타입 안정성 |
| **NestJS** | Controller(라우팅) → Service(로직) → Repository(데이터). DI·모듈·Guard/Pipe |
| **Prisma** | `schema.prisma`로 모델 정의, 타입 안전 쿼리 클라이언트 자동 생성, 마이그레이션 |
| **PostgreSQL** | 관계형 DB, 트랜잭션·인덱스·JSON. Docker 볼륨에 영속 저장 |
| **Docker** | 프론트·백엔드·DB를 컨테이너로 격리, `docker compose`로 한 번에 실행 |

# 데이터 모델 (Prisma)

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}
```

```bash
npx prisma migrate dev --name init   # 스키마 → DB 반영 + 마이그레이션
npx prisma generate                  # 타입 안전 클라이언트 생성
```

# API 레이어 (NestJS)

```typescript
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({ include: { posts: true } });
  }
  create(email: string, name?: string) {
    return this.prisma.user.create({ data: { email, name } });
  }
}

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()  findAll() { return this.users.findAll(); }            // GET /users
  @Post() create(@Body() dto: CreateUserDto) {                  // POST /users
    return this.users.create(dto.email, dto.name);
  }
}
```

# 전체 실행 (docker-compose)

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app
    volumes: [pgdata:/var/lib/postgresql/data]
    ports: ["5432:5432"]
  api:
    build: ./api
    depends_on: [db]
    environment:
      DATABASE_URL: "postgresql://app:secret@db:5432/app"
    ports: ["3000:3000"]
  web:
    build: ./web
    depends_on: [api]
    ports: ["5173:5173"]
volumes:
  pgdata:
```

```bash
docker compose up -d --build     # 빌드 + 백그라운드 실행
docker compose logs -f api       # API 로그
docker compose down              # 정지 + 제거
```

> 💡 **핵심 포인트.** 컨테이너끼리는 서비스 이름(`db`, `api`)을 호스트명처럼 쓴다. 그래서 `DATABASE_URL`의 호스트가 `localhost`가 아니라 `db`다. 데이터는 `pgdata` 볼륨에 보존되어 컨테이너를 지워도 살아남는다.

# 이 조합을 쓰는 이유

TypeScript로 프론트(React)와 백엔드(NestJS)를 통일하고, Prisma로 타입 안전하게 PostgreSQL을 다루며, Docker로 전체를 재현 가능한 환경으로 묶는다. 작은 서비스부터 엔터프라이즈까지 확장되는 검증된 조합이다.
