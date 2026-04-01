# 작업 인계 문서
> 생성: 2026-03-31
> 브랜치: master
> 마지막 커밋: 376fbf3 — feat: Confluence Window alloy 매뉴얼 내용 반영

## 새 세션 시작 방법
```
HANDOFF.md 읽고 "gemini_html 사이트 작업" 이어서 해줘.
```

---

## 완료된 작업

- [x] **Taste Skill 페이지 추가** (커밋: 918dbb7)
  - `gemini_html/taste_skill.html` — skeumorphism #17 템플릿, ❋ Claude 카테고리

- [x] **Claude Code Workflow 치트시트 페이지 추가** (커밋: 6467fed → 1647c10)
  - `gemini_html/claude_code_cheatsheet.html` — syntax #4, ❋ Claude 카테고리 (해시: 46CN3L7)

- [x] **AI 5종 비교 페이지 추가** (커밋: 159980e)
  - `gemini_html/ai_comparison.html` — protocol #3, 🤖 AI Study (해시: SU36CZU)

- [x] **Grafana Alloy Ansible 배포 가이드 페이지 추가** (커밋: 7fcf440)
  - `gemini_html/alloy_ansible_deploy.html` — syntax #4, 🛜플랫폼인프라 (해시: 8GV7VUL)
  - 실제 설정 파일 분석 기반: Linux/Windows/거점 Hub 3종 배포 타입
  - Ansible 인벤토리 · 플레이북 · Role · Jinja2 템플릿 예제 코드 포함
  - SVG 아키텍처 다이어그램 (Alloy → 로컬 Kafka → MM2 → GCP)

- [x] **Confluence Window alloy 매뉴얼 반영** (커밋: 376fbf3)
  - Kafka 토픽 네이밍 규칙 추가: `{env}.{domain}.telemetry.{signal}`
  - Tomcat JMX 수동 설정 절차 및 Ansible Windows Role에 JMX 파일 배포 태스크 추가

---

## 남은 작업 (우선순위 순)

1. **[나중에]** `📚 Design study` [9VXP99K] — 카테고리만 있고 페이지 없음
2. **[나중에]** `֎🇦🇮 Design by AI` [R77XGMQ] — 카테고리만 있고 페이지 없음
3. **[나중에]** `gemini_html/claude_guide.html` — modified 상태, 아직 커밋 안 됨
4. **[나중에]** `gemini_html/tmux_guide.html` — untracked, 아직 커밋 안 됨
5. **[나중에]** Linux alloy 설치 매뉴얼 Confluence 페이지가 있다면 URL 받아서 반영
6. **[나중에]** 실제 Ansible playbook repo 생성 (현재 페이지는 가이드 문서)
7. **[나중에]** 거점 서버 vSphere syslog ESXi 호스트 설정 방법 추가

---

## 현재 작업 중인 파일

- `gemini_html/alloy_ansible_deploy.html` — Grafana Alloy Ansible 배포 가이드 (완성, 배포됨)
- `gemini_html/claude_guide.html` — modified (내용 불명, 커밋 전 확인 필요)
- `gemini_html/tmux_guide.html` — untracked (tmux 개발 환경 가이드, 커밋 대기 중)

---

## 분석한 설정 파일 (이번 세션)

```
C:\Users\CHRIS LEE\Downloads\설정파일-20260331T052313Z-3-001\설정파일\
├── alloy\Linux\alloy\config.alloy        ← Linux 메인 설정
├── alloy\Linux\alloy\modules\
│   ├── mysql.alloy / oracle.alloy / postgres.alloy
├── alloy\Window\Alloy\config.alloy       ← Windows 메인 설정
├── alloy\Window\Alloy\modules\
│   ├── mssql.alloy / iis.alloy / tomcat.alloy / oracle.alloy / mariadb.alloy
└── alloy\거점 kafka\alloy\config.alloy   ← vSphere 거점 설정
    ├── modules\healthcheck.alloy / vsphere.alloy
    └── kafka(mm2)\config\mm2.properties
```

---

## 핵심 기술 결정사항

| 결정 | 이유 |
|------|------|
| Kafka 토픽 규칙 `{env}.{domain}.telemetry.{signal}` | Confluence Window alloy 매뉴얼 공식 기준 |
| Ansible Linux/Windows Role 분리 | OS별 연결 방식(SSH vs WinRM)이 다름 |
| Jinja2 템플릿으로 config.alloy 생성 | 서버마다 다른 변수(p_company, p_site, kafka_brokers 등) 주입 |
| 비밀 관리: ansible-vault | DB 비밀번호, vSphere 비밀번호 평문 저장 금지 |
| 거점 서버 CAP_NET_BIND_SERVICE + CAP_NET_RAW | UDP 514(syslog) + ICMP Ping(blackbox) 권한 필요 |
| Tomcat JMX Java Options → 수동 설정 명시 | Tomcat10w.exe GUI로만 설정 가능, Ansible 반자동화 |
| `prefers-reduced-motion` 미적용 | 사용자 의도: 적절한 애니메이션 필요, 경험 우선 |
| 이미지 첨부 시 원본+한글SVG 나란히 | image-pair 2열 그리드, base64 임베딩 + SVG 한글화 재현 |

---

## 알려진 사항 / 주의

- **Jinja2 vs alloy 문법 충돌**: config.alloy 내 백틱 블록의 `constants.hostname`은 Jinja2 표현식 아님. 충돌 시 `{% raw %}...{% endraw %}` 사용
- **Google Drive 폴더 접근 불가**: `chris-google@security-portal-common.iam.gserviceaccount.com`으로 공유 안 됨 → 파일 직접 다운로드로 대체
- **Windows WinRM 필수**: Ansible Windows 배포 전 대상 서버에서 `winrm quickconfig` 실행 필요
- **SUSE Linux zypper**: `ansible_os_family == "Suse"` 분기 처리 필요
- **GitHub Dependabot 취약점 39개 알림** — push 때마다 표시됨, 사용자가 인지 중
- **템플릿 수정은 로컬에만 반영** (`~/.claude/skills/add-new-page/templates/`). git 레포 대상 아님

---

## 참고 Confluence 페이지

- **Window alloy 설치 매뉴얼**: https://vntg.atlassian.net/wiki/spaces/~7120202bef583e70e64e48adce2097a89795c2/pages/2354086182/Window+alloy
  - 설치 파일: Google Drive `1zd7gkatiR56-9I3yuex_Ftu3awCmFrvZ`
  - Tomcat JMX Agent: `jmx_prometheus_javaagent-1.5.0.jar`, 포트 9404

---

## 현재 사이트 카테고리 목록

| 해시 | 이름 | 비고 |
|------|------|------|
| QT38XYX | 🤖 AI Study | |
| 30BD927 | 🤖 AI-Worker | |
| VNTG7S2 | 🚀 VNTG AI Study | |
| RDH10WS | 🔥 R&D Hot News | |
| AED13WE | 🔬 R&D Projects | |
| BF7K2M9 | 💼 Work | |
| C8PQ4X1 | ✈️ Travel | |
| RU4TYZ1 | 🔒 Private | |
| KPYMQ8C | 🌉MCP | |
| NVZPZK4 | 🏢지역센터관련 | |
| RHF2LJN | 🛜플랫폼인프라 | |
| WU8Y4PL | 🧪플랫폼개발 | |
| 7S8LZFY | ❋ Claude | |
| QGNUMQY | 🏯교토 여행 | |
| AEJUB79 | 🛡️플랫폼정보보호 | |
| V5SPGM4 | 📚 Work Study | |
| LR4ME7B | 🚀 AIVE Journey | |
| QWW59US | 🏆 AIVE-CONTEST | |
| 9VXP99K | 📚 Design study | 신규, 페이지 없음 |
| R77XGMQ | ֎🇦🇮 Design by AI | 신규, 페이지 없음 |
| AH3JM8T | ✴️CLAUDE Change Logs | |
| SJ8EKBM | 🌱 CEPAGE | |

---

## 관련 파일

- 스킬 파일: `/home/chris/.claude/skills/add-new-page/SKILL.md`
- 템플릿 목록: `/home/chris/.claude/skills/add-new-page/TEMPLATES.md`
- 이미지 처리: `/home/chris/.claude/skills/add-new-page/TREAT_IMAGE.md`
- 템플릿 갤러리: `/home/chris/.claude/skills/add-new-page/templates/` (22종)
- site.json: `/home/chris/git/chrisKILee.github.io/gemini_html/site.json`
- 배포 URL: `https://page.chrisnolja.dev/gemini_html/`
- 이번 세션 결과물: `https://page.chrisnolja.dev/gemini_html/alloy_ansible_deploy.html`
