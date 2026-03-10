# Claude Code Slack 알림 훅 설정 가이드

Claude Code 작업 완료 및 권한 요청 시 Slack으로 알림을 보내는 훅 설정 방법입니다.

---

## 사전 요구사항

다음 도구가 설치되어 있어야 합니다.

```bash
# jq 설치 확인
jq --version

# curl 설치 확인
curl --version
```

### macOS 설치 방법

```bash
brew install jq curl
```

---

## Slack Incoming Webhook 발급

1. [Slack API 앱 관리 페이지](https://api.slack.com/apps)에 접속
2. **Create New App** → **From scratch** 선택
3. App Name 입력 (예: `Claude Code`) 후 워크스페이스 선택
4. 좌측 메뉴 **Incoming Webhooks** → **Activate Incoming Webhooks** ON
5. **Add New Webhook to Workspace** 클릭
6. 알림을 받을 채널 선택 (예: `#claude-code`)
7. 생성된 Webhook URL 복사 (형식: `https://hooks.slack.com/services/T.../B.../...`)

---

## 설치 단계

### 1. 훅 파일 복사

프로젝트 루트에서 실행:

```bash
mkdir -p .claude/hooks
cp notification-hook.sh .claude/hooks/
cp stop-hook.sh .claude/hooks/
```

### 2. 실행 권한 부여

```bash
chmod +x .claude/hooks/notification-hook.sh
chmod +x .claude/hooks/stop-hook.sh
```

### 3. `.env` 파일 설정

프로젝트 루트에 `.env` 파일을 생성하고 Webhook URL을 입력합니다.

```bash
# .env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

> **보안 주의:** `.env` 파일이 `.gitignore`에 포함되어 있는지 반드시 확인하세요.

```bash
# .gitignore에 추가 (없는 경우)
echo ".env" >> .gitignore
```

---

## settings.json 훅 설정

`.claude/settings.json`에 다음을 추가합니다.

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/notification-hook.sh"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/stop-hook.sh"
          }
        ]
      }
    ]
  }
}
```

---

## 테스트 방법

### 문법 검사

```bash
bash -n .claude/hooks/notification-hook.sh
bash -n .claude/hooks/stop-hook.sh
```

### 직접 실행 테스트

`.env`에 실제 Webhook URL을 설정한 후:

```bash
# Notification 훅 테스트
echo '{"message": "테스트 알림입니다."}' | CLAUDE_PROJECT_DIR=$(pwd) .claude/hooks/notification-hook.sh

# Stop 훅 테스트
echo '{"stop_hook_active": true}' | CLAUDE_PROJECT_DIR=$(pwd) .claude/hooks/stop-hook.sh
```

Slack `#claude-code` 채널에 알림이 수신되면 성공입니다.

### Claude Code에서 실제 동작 확인

Claude Code로 작업 후 응답이 완료되면 Stop 이벤트가 발생하여 Slack에 알림이 전송됩니다.

---

## 훅 이벤트 JSON 구조 참고

### Notification 이벤트

```json
{
  "message": "권한 요청 또는 사용자 입력 대기 메시지"
}
```

### Stop 이벤트

```json
{
  "stop_hook_active": true
}
```

---

## 문제 해결

| 증상 | 원인 | 해결 방법 |
|------|------|-----------|
| `Permission denied` 오류 | 실행 권한 없음 | `chmod +x .claude/hooks/*.sh` |
| `.env 파일을 찾을 수 없습니다` | `.env` 미생성 또는 경로 오류 | `CLAUDE_PROJECT_DIR` 환경변수 확인 |
| Slack 알림 미수신 | Webhook URL 오류 | `.env`의 URL이 올바른지 확인 |
| `jq: command not found` | jq 미설치 | `brew install jq` |
