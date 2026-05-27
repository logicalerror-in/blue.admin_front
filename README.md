# blue.admin_front

관리자용 Frontend 애플리케이션 저장소입니다.

## 역할

- 관리자 화면 제공
- Admin BFF와 Same-Origin REST API 방식으로 통신
- 초기 단계에서는 `/api/admin/me` Mock 응답 표시
- OAuth2/OIDC Token을 직접 저장하지 않음

## 기술 스택

- React
- TypeScript
- Vite
- Production Container는 Nginx 기반 정적 파일 서빙 방식 사용

## 실행 방법

```bash
npm install
npm run dev
```

기본 개발 서버 주소:

```text
http://localhost:11000
```

## 원칙

- Frontend는 Backend 절대 URL을 직접 참조하지 않음
- 모든 API 호출은 `/api/admin/*` 상대 경로 사용
- 로컬 통합 실행 및 오케스트레이션은 `blue.admin_workspace`에서 관리
