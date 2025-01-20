This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 폴더 구조 설명

├─public # 정적 파일 (이미지, 아이콘, 폰트 등) │ ├─fonts # 폰트 파일 │ ├─icons # 아이콘 파일 │ └─images # 이미지 파일 (사용자 프로필 사진, 배너 등) └─src # 소스 코드 ├─app # 페이지 및 레이아웃 관련 │ │ favicon.ico # 웹사이트 파비콘 │ │ layout.tsx # 전체 페이지 레이아웃, 공통 헤더 및 푸터 등 설정 │ │ page.tsx # 메인 페이지 컴포넌트 │ │ │ ├─auth # 인증 관련 페이지 (로그인, 회원가입) │ │ ├─login # 로그인 관련 페이지 │ │ │ page.tsx # 로그인 페이지 컴포넌트 │ │ │ │ │ └─signup # 회원가입 관련 페이지 │ │ page.tsx # 회원가입 페이지 컴포넌트 │ │ │ ├─community # 커뮤니티 관련 페이지 (게시판 등) │ │ ├─recruitment # 모집 글 게시판 관련 페이지 │ │ │ page.tsx # 모집 글 게시판 페이지 컴포넌트 │ │ │ │ │ └─reviews # 후기 게시판 관련 페이지 │ │ page.tsx # 후기 게시판 페이지 컴포넌트 │ │ │ ├─explore # 여행지, 레저, 공연 등 탐색 페이지 │ │ ├─concert # 공연 관련 페이지 │ │ │ page.tsx # 공연 검색 및 정보 제공 페이지 컴포넌트 │ │ │ │ │ ├─festival # 축제 관련 페이지 │ │ │ page.tsx # 축제 검색 및 정보 제공 페이지 컴포넌트 │ │ │ │ │ ├─leisure # 레저 활동 관련 페이지 │ │ │ page.tsx # 레저 활동 검색 및 정보 제공 페이지 컴포넌트 │ │ │ │ │ └─travel # 여행지 관련 페이지 │ │ page.tsx # 여행지 검색 및 정보 제공 페이지 컴포넌트 │ │ │ ├─mypage # 사용자 마이페이지 관련 │ │ ├─favorites # 즐겨찾기 페이지 │ │ │ page.tsx # 즐겨찾기한 여행지, 숙소 등 페이지 컴포넌트 │ │ │ │ │ ├─plans # 여행 계획 페이지 │ │ │ page.tsx # 사용자가 만든 여행 계획 정보 페이지 컴포넌트 │ │ │ │ │ ├─profile # 프로필 페이지 │ │ │ page.tsx # 사용자 프로필 편집 및 정보 페이지 컴포넌트 │ │ │ │ │ └─visited # 방문한 장소 페이지 │ │ page.tsx # 사용자가 방문한 장소 기록 페이지 컴포넌트 │ │ │ └─reservations # 예약 관련 페이지 │ │ page.tsx # 예약 관련 컴포넌트 (예약 목록 등) │ │ │ ├─accommodations # 숙소 예약 관련 페이지 │ │ page.tsx # 숙소 예약 페이지 컴포넌트 │ │ │ └─restaurants # 레스토랑 예약 관련 페이지 │ page.tsx # 레스토랑 예약 페이지 컴포넌트 │ ├─components # 재사용 가능한 컴포넌트 │ ├─auth # 인증 관련 컴포넌트 (로그인, 회원가입 폼 등) │ │ AuthForm.tsx # 로그인/회원가입 폼 컴포넌트 │ │ │ ├─common # 공통 컴포넌트 (버튼, 헤더, 푸터 등) │ │ Button.tsx # 버튼 컴포넌트 │ │ Footer.tsx # 푸터 컴포넌트 │ │ Header.tsx # 헤더 컴포넌트 │ │ Modal.tsx # 모달 컴포넌트 │ │ │ └─travel # 여행 관련 컴포넌트 (여행지 카드, 필터 등) │ FilterBar.tsx # 여행지 필터 바 컴포넌트 │ TravelCard.tsx # 여행지 카드 컴포넌트 │ ├─constants # 상수 값 관리 │ apiEndpoints.ts # API 엔드포인트 상수 │ routes.ts # 라우트 경로 상수 │ ├─hooks # 커스텀 훅 │ useAuth.ts # 사용자 인증 관련 훅 │ useFilter.ts # 필터링 로직 훅 (예: 여행지, 숙소, 레저 등) │ ├─store # 전역 상태 관리 (예: Redux) │ authStore.ts # 사용자 인증 상태 관리 │ ├─styles # 스타일 관련 │ globals.css # 전역 스타일 │ tailwind.config.ts # Tailwind CSS 설정 │ ├─types # TypeScript 타입 정의 │ auth.ts # 사용자 관련 타입 정의 │ community.ts # 커뮤니티 관련 타입 정의 │ travel.ts # 여행 관련 타입 정의 │ └─utils # 유틸리티 함수들 api.ts # API 요청 함수 (예: GET, POST 요청 등) storage.ts # 로컬 스토리지 관련 함수 validation.ts # 입력 값 검증 함수
