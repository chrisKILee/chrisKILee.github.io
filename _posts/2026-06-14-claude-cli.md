---
layout: post
title:  "Claude Code CLI 완전 가이드"
subtitle: "터미널에서 코딩하는 에이전트 — 설치부터 실전까지"
author: chris
avatar: "img/authors/profile.png"
image: "img/claude-cli.svg"
featured: true
categories : [all, AI, CLI]
---

> 💻 **인터랙티브 전체 가이드(SVG 다이어그램 포함):** [Dev Guide · Claude Code CLI →](/dev-guide/claude_cli.html)

Claude Code는 코드베이스를 읽고, 파일을 수정하고, 명령을 실행하고, 개발 도구와 통합되는 **에이전트형 코딩 도구**다. 터미널·IDE·데스크톱 앱·브라우저에서 동작하며, 이 글은 터미널 CLI 기준이다.

# 설치

```bash
# macOS / Linux / WSL (네이티브 설치, 권장 — 백그라운드 자동 업데이트)
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# Homebrew
brew install --cask claude-code

# WinGet
winget install Anthropic.ClaudeCode
```

```bash
# 프로젝트로 이동해 실행 — 최초 실행 시 로그인 안내
cd your-project
claude
```

최초 실행 시 로그인 프롬프트가 뜬다. 대부분의 환경은 **Claude 구독** 또는 **Anthropic Console** 계정이 필요하며, 터미널 CLI와 VS Code는 서드파티 프로바이더도 지원한다.

# 동작 방식 — 에이전트 루프

Claude Code는 단순 자동완성이 아니라 **이해 → 계획 → 실행 → 검증**을 반복하는 에이전트다.

1. **이해** — 코드베이스를 읽는다
2. **계획** — Plan 모드로 접근법을 세운다
3. **실행** — 파일 편집·명령 실행·도구 사용
4. **검증** — 테스트·커밋, 실패 시 반복

# 핵심 기능

| 기능 | 설명 |
|------|------|
| **CLAUDE.md** | 프로젝트 루트에 두면 매 세션 시작 시 읽는 메모리. 코딩 표준·아키텍처·리뷰 체크리스트를 명시 |
| **스킬** | 반복 워크플로우를 패키지화한 슬래시 명령 (`/review-pr`, `/deploy-staging`) |
| **MCP** | Model Context Protocol로 Google Drive·Jira·Slack·커스텀 도구 연결 |
| **훅(Hooks)** | 액션 전후로 셸 명령 실행 (편집 후 자동 포맷, 커밋 전 린트) |
| **서브에이전트** | 여러 에이전트가 작업 분담, 리드 에이전트가 조율·병합 |

# 실전 사용법

```bash
# 자연어로 작업 지시
claude "write tests for the auth module, run them, and fix any failures"

# 변경사항 커밋
claude "commit my changes with a descriptive message"

# 헤드리스(-p): 로그 분석 후 Slack 알림
tail -200 app.log | claude -p "Slack me if you see any anomalies"

# 변경된 파일만 보안 리뷰
git diff main --name-only | claude -p "review these changed files for security issues"
```

> 💡 **Plan 모드 먼저.** 복잡한 작업은 먼저 계획을 세우게 한 뒤 실행시키면 품질이 크게 오른다. 작업은 작게 쪼갤수록 좋다.

# 세션 안에서 자주 쓰는 것들

| 명령 | 설명 |
|------|------|
| `claude` | 대화형 세션 시작 |
| `claude -p "..."` | 헤드리스(비대화) 1회 실행 — 파이프·CI용 |
| `/schedule` | 반복 작업(Routines) 생성 |
| `/loop` | 세션 안에서 프롬프트를 주기적으로 반복(폴링) |
| `/desktop` | 현재 터미널 세션을 데스크톱 앱으로 핸드오프 |

전체 명령·플래그는 [공식 CLI 레퍼런스](https://code.claude.com/docs/en/overview)를 참고. (출처: code.claude.com/docs, 2026-06-14 기준)
