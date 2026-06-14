---
layout: post
title:  "Jekyll Tips"
subtitle: "정적 사이트 생성기 — 설치부터 GitHub Pages 배포까지"
author: chris
avatar: "img/authors/profile.png"
image: "img/jekyll.png"
categories : [all, Tip]
---

> Jekyll은 마크다운 글을 정적 HTML로 변환해주는 Ruby 기반 사이트 생성기다. GitHub Pages가 기본 지원해 개발자 블로그로 가장 많이 쓰인다. (이 블로그도 Jekyll로 만들어졌다.)

# 설치

Jekyll은 Ruby가 필요하다.

```bash
# macOS — 시스템 Ruby 대신 Homebrew Ruby 권장
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Ubuntu
sudo apt install ruby-full build-essential zlib1g-dev

# Jekyll + Bundler 설치
gem install jekyll bundler

# 버전 확인
jekyll --version
```

# 새 사이트 만들기

```bash
jekyll new myblog          # 새 사이트 생성
cd myblog
bundle install             # 의존성 설치
bundle exec jekyll serve   # 로컬 서버 (http://localhost:4000)

# 변경 자동 반영 + 초안 포함
bundle exec jekyll serve --livereload --drafts
```

# 디렉토리 구조

```text
myblog/
├── _config.yml        # 사이트 전역 설정
├── _posts/            # 블로그 글 (YYYY-MM-DD-title.md)
├── _drafts/           # 미발행 초안 (날짜 없음)
├── _layouts/          # 페이지 골격 템플릿 (default, post...)
├── _includes/         # 재사용 조각 (header, footer...)
├── _data/             # YAML/JSON/CSV 데이터
├── _sass/             # SCSS 파셜
├── assets/            # CSS·JS·이미지
├── index.html         # 홈
└── Gemfile            # Ruby 의존성
```

# 포스트 작성

파일명은 반드시 `YYYY-MM-DD-제목.md` 형식. 상단에 Front Matter(YAML)를 둔다.

```markdown
---
layout: post
title:  "글 제목"
subtitle: "부제"
author: chris
categories: [all, tip]
tags: [jekyll, blog]
---

# 본문 시작

마크다운으로 작성하면 HTML로 변환된다.
```

## Front Matter 주요 변수

| 변수 | 설명 |
|------|------|
| `layout` | 사용할 레이아웃 (`_layouts/post.html`) |
| `title` / `subtitle` | 제목 / 부제 |
| `date` | 발행일 (파일명보다 우선) |
| `categories` / `tags` | 분류 |
| `permalink` | URL 커스터마이징 (예: `/about/`) |
| `published` | `false`면 발행 제외 |

# _config.yml 핵심 설정

```yaml
title: Chris's Blog
description: 개발 기록
baseurl: ""                 # 서브경로 (예: "/blog")
url: "https://example.com"

markdown: kramdown
permalink: /:categories/:year/:month/:day/:title.html

plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap

# 빌드 제외
exclude:
  - node_modules
  - README.md
```

> ⚠️ `_config.yml`을 수정하면 `jekyll serve`를 **재시작**해야 반영된다 (다른 파일은 자동 반영).

# Liquid 템플릿 (자주 쓰는 문법)

```liquid
{% raw %}
{{ page.title }}                  <!-- 변수 출력 -->
{{ site.title }}

{% for post in site.posts %}      <!-- 반복 -->
  <a href="{{ post.url }}">{{ post.title }}</a>
{% endfor %}

{% if page.author %}              <!-- 조건 -->
  by {{ page.author }}
{% endif %}

{{ content | strip_html | truncate: 120 }}   <!-- 필터 -->
{% endraw %}
```

# 빌드 & 배포

```bash
# 정적 파일 빌드 → _site/ 생성
bundle exec jekyll build

# 운영 환경 빌드
JEKYLL_ENV=production bundle exec jekyll build
```

## GitHub Pages 배포

가장 쉬운 무료 배포 방법.

1. 저장소 이름을 `username.github.io` 로 생성
2. Jekyll 프로젝트를 그대로 push
3. Settings → Pages → Source: `main` 브랜치 선택
4. `https://username.github.io` 로 자동 배포 (push마다 자동 재빌드)

```bash
git init
git add .
git commit -m "init jekyll site"
git remote add origin git@github.com:username/username.github.io.git
git push -u origin main
```

> 💡 GitHub Pages는 일부 플러그인만 허용한다. 자유로운 플러그인을 쓰려면 GitHub Actions로 직접 빌드해 배포하면 된다.

# 자주 겪는 문제

```bash
# 의존성 충돌 → 잠금 파일 갱신
bundle update

# 캐시 꼬임 → 클린 빌드
bundle exec jekyll clean && bundle exec jekyll serve

# 특정 포트로 실행
bundle exec jekyll serve --port 4001
```
