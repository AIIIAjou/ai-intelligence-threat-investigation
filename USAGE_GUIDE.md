# OSINT Intelligence Platform - 사용 가이드

## 🚀 빠른 시작

### 1. 백엔드 에러 해결 (OpenAI API 키 설정)

프로토타입을 실행하려면 OpenAI API 키가 필요합니다.

#### 방법 1: 환경변수 설정 (권장)

```bash
# macOS/Linux
export OPENAI_API_KEY='your-api-key-here'

# Windows (PowerShell)
$env:OPENAI_API_KEY='your-api-key-here'

# Windows (CMD)
set OPENAI_API_KEY=your-api-key-here
```

#### 방법 2: .env 파일 사용

1. `python-backend` 폴더에 `.env` 파일 생성:

```bash
cd python-backend
cp .env.example .env
```

2. `.env` 파일을 열고 API 키 입력:

```env
OPENAI_API_KEY=your-actual-api-key-here
```

3. `python-dotenv` 설치 (requirements.txt에 이미 포함됨):

```bash
pip install python-dotenv
```

> **API 키 발급**: [OpenAI Platform](https://platform.openai.com/api-keys)에서 발급 가능

---

### 2. 프로젝트 실행

#### 백엔드 실행

```bash
cd python-backend

# 가상환경 활성화 (처음 한 번만)
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# 의존성 설치 (처음 한 번만)
pip install -r requirements.txt

# 서버 실행
uvicorn api:app --reload --port 8000
```

백엔드가 `http://localhost:8000`에서 실행됩니다.

#### 프론트엔드 실행 (별도 터미널)

```bash
cd ui

# 의존성 설치 (처음 한 번만)
npm install

# 개발 서버 실행
npm run dev
```

프론트엔드가 `http://localhost:3000`에서 실행됩니다.

---

## 🎬 Fake Chat 데모 시나리오 사용법

**Fake Chat 기능**은 OpenAI API 키 없이도 프로토타입을 시연할 수 있는 기능입니다!

### 사용 방법

1. **브라우저에서 `http://localhost:3000` 접속**

2. **우측 상단 "Demo Scenarios" 버튼 클릭**
   - 보라색/핑크색 그라데이션 버튼

3. **시나리오 선택**:
   - ✅ **Basic OSINT Investigation**: 사용자 "CyberPhantom2024" 위협 조사 (8 메시지)
   - ✅ **Domain Threat Analysis**: 피싱 도메인 분석 (3 메시지)
   - ✅ **Quick Information Gathering**: OSINT 도구 정보 (2 메시지)

4. **"Load Scenario" 버튼 클릭**

5. **자동으로 채팅 기록이 로드됨**
   - 미리 정의된 대화 내용
   - Investigation Context 자동 업데이트
   - 레포트 표시 (시나리오에 포함된 경우)

### Fake 데이터 커스터마이징

`ui/public/fake-chat-data.json` 파일을 수정하여 새로운 시나리오를 추가할 수 있습니다:

```json
{
  "scenarios": [
    {
      "id": "your-scenario-id",
      "name": "시나리오 이름",
      "messages": [
        {
          "role": "user",
          "content": "사용자 메시지"
        },
        {
          "role": "assistant",
          "content": "AI 응답"
        }
      ],
      "context": {
        "target_name": "타겟 이름",
        "threat_level": "MEDIUM"
      }
    }
  ]
}
```

---

## 🎨 UI 주요 기능

### 1. Intelligence Agents 패널

#### **Management Agent (상단 큰 카드)**
- 🧠 **Brain 아이콘**: 중앙 조정 에이전트
- **Primary 배지**: 메인 LLM 표시
- **Active 상태**: 초록색 점 + "ACTIVE" 텍스트
- **Coordinates 정보**: 관리하는 서브 에이전트 목록

#### **Sub Agents (2x2 그리드)**
- ⚡ **Create Variations Agent**: 검색 쿼리 최적화
- 🔍 **SNS Search Agent**: 소셜 미디어 조사
- 🌐 **Web Search Agent**: 웹 인텔리전스 수집
- 🖼️ **Image Process Agent**: 이미지 분석

**상태 표시**:
- **EXECUTING**: 현재 실행 중 (cyan glow 효과)
- **Ready**: 사용 가능 상태
- **비활성**: 회색 처리 + 흐림

### 2. Guardrails 패널
- ✅ **Relevance Guardrail**: 인텔리전스 작업 관련성 검증
- 🛡️ **Jailbreak Guardrail**: 보안 프로토콜 우회 차단

### 3. Investigation Context 패널
- **target_name**: 조사 대상
- **target_id**: 대상 ID
- **threat_level**: 위협 수준 (LOW/MEDIUM/HIGH/CRITICAL)
- **classification**: 분류 등급 (UNCLASSIFIED/CONFIDENTIAL/SECRET)
- **report_id**: 보고서 ID

### 4. AI Reasoning Output 패널
실시간 에이전트 추론 과정 표시:
- 🔄 Handoff: 에이전트 간 전환
- 🔧 Tool Call: 도구 실행
- 📤 Tool Output: 도구 결과
- 🔁 Context Update: 컨텍스트 변경

### 5. Analyst Interface (채팅)
- **사용자 메시지**: Cyan 말풍선
- **AI 메시지**: 회색 말풍선
- **Intelligence Report**: "DISPLAY_INTELLIGENCE_REPORT" 트리거 시 자동 표시

---

## 🔍 실제 사용 예시

### 예시 1: 기본 OSINT 조사

```
사용자: "I need to conduct an OSINT investigation on a potential threat actor."

AI: "I'll help you conduct an OSINT investigation. To begin, I need some basic information..."

사용자: "The target is a user going by the handle 'CyberPhantom2024'."

AI: [Management Agent가 Create Variations Agent로 전환]
     "Generating query variations..."

     [SNS Search Agent 실행]
     "SNS Search completed: 8 profiles found..."

     [Web Search Agent 실행]
     "Web Search: 45 sources found..."

사용자: "Generate the full intelligence report."

AI: [Intelligence Report 표시]
```

### 예시 2: 도메인 위협 분석

```
사용자: "Analyze the domain suspicious-tech-deals.com for potential phishing"

AI: [Management Agent → Web Search Agent]
     "Domain Intelligence Gathered..."
     "THREAT ASSESSMENT: HIGH"
```

---

## 📝 트러블슈팅

### 백엔드 에러: "OpenAI API key must be set"

**원인**: OpenAI API 키가 설정되지 않음

**해결**:
1. 환경변수 설정 확인
2. `.env` 파일 생성 및 API 키 입력
3. 백엔드 재시작

### 프론트엔드가 백엔드에 연결되지 않음

**해결**:
1. 백엔드가 `http://localhost:8000`에서 실행 중인지 확인
2. `ui/next.config.mjs`의 proxy 설정 확인:
   ```js
   rewrites() {
     return [{ source: "/chat", destination: "http://127.0.0.1:8000/chat" }]
   }
   ```

### Fake Chat 데이터가 로드되지 않음

**해결**:
1. `ui/public/fake-chat-data.json` 파일 존재 확인
2. JSON 형식 오류 확인 (유효한 JSON인지)
3. 브라우저 콘솔에서 에러 메시지 확인

---

## 🎯 데모 팁

1. **Demo Scenarios 버튼으로 시작**: API 키 없이 빠른 시연
2. **Management Agent 강조**: 중앙 조정 역할 설명
3. **Agent 전환 관찰**: Runner Output에서 handoff 이벤트 확인
4. **Guardrails 테스트**: 관련 없는 질문 입력하여 차단 확인
5. **Intelligence Report**: "generate report" 요청으로 최종 보고서 표시

---

## 🔧 개발자 정보

### 프로젝트 구조

```
openai-cs-agents-demo/
├── python-backend/          # FastAPI 백엔드
│   ├── main.py             # Agent 정의 및 도구
│   ├── api.py              # REST API 엔드포인트
│   └── .env                # 환경변수 (생성 필요)
│
└── ui/                     # Next.js 프론트엔드
    ├── app/page.tsx        # 메인 페이지
    ├── components/         # React 컴포넌트
    │   ├── agents-list.tsx         # Agent 카드
    │   ├── intelligence-report.tsx # 보고서 UI
    │   ├── fake-chat-loader.tsx    # 시나리오 로더
    │   └── ...
    └── public/
        └── fake-chat-data.json     # 데모 시나리오
```

### 기술 스택

**백엔드**:
- FastAPI (Python)
- OpenAI Agents SDK
- Pydantic

**프론트엔드**:
- Next.js 15
- React 19
- Tailwind CSS
- TypeScript

---

## 📄 라이센스

MIT License - 자유롭게 수정 및 배포 가능
