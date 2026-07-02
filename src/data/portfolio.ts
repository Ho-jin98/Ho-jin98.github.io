export const profile = {
  name: '정호진',
  nameEn: 'HOJIN',
  role: 'Backend Engineer',
  email: 'hohoj98@naver.com',
  github: 'https://github.com/Ho-jin98',
  blog: 'https://hojin98.tistory.com/',
  location: 'SEOUL, KR',
  introduction: [
    '빠르게 배우고, 직접 적용하며,',
    '실제로 동작하는 서비스 흐름을 만들어가고 있습니다.',
  ],
};

export const projects = [
  {
    number: '02',
    projectNumber: '01',
    slug: 'hankkipot',
    name: 'HANKKIPOT',
    title: '한끼팟',
    landingTitle: '한끼팟',
    tagline: '대학생을 위한 폐쇄형 식사 매칭 플랫폼',
    subtitle: '대학생 식사 매칭 플랫폼',
    period: '2026.05 — 2026.06',
    team: '5인 팀 프로젝트',
    headline: ['GPS와 QR로', '만남 인증 흐름을 구현했습니다.'],
    description: [
      '한끼팟은 같은 학교라는 공동체 안에서 식사 메이트를 찾을 수 있도록 기획한 대학생 대상 플랫폼입니다.',
      '완전히 낯선 사람과 만나는 부담을 줄이고,\n학교 이메일 인증 기반의 폐쇄형 구조로 더 자연스러운 만남을 만들고자 했습니다.',
    ],
    role: '만남 인증 · 위치 · 관리자 · UI/UX',
    stack: ['Spring Boot', 'JPA', 'Redis', 'React', 'TypeScript', 'Kakao Maps'],
    keywords: ['GPS 인증', 'QR 인증', '노쇼 판정', '관리자 처리', '포인트 정산'],
    metadata: [
      { label: 'ROLE', value: 'Backend' },
      { label: 'TYPE', value: 'Team Project' },
      { label: 'FOCUS', value: '대학생 매칭' },
    ],
    href: '/work/hankkipot',
    github: 'https://github.com/Team3-Final-Project-SNS/Final-project',
    overview:
      '오프라인 만남이 장소 인증에서 완료와 정산까지 이어지는 과정을 서비스 정책과 상태 변화 중심으로 다룬 프로젝트입니다.',
  },
  {
    number: '03',
    projectNumber: '02',
    slug: 'k-server',
    name: 'K-SERVER',
    title: 'K-server',
    landingTitle: 'K-server',
    tagline: '커피 주문 시스템으로 풀어낸 백엔드 설계 프로젝트',
    subtitle: '다중 인스턴스를 가정한 커피 주문 시스템',
    period: '2026.04 — 2026.05',
    team: '1인 프로젝트',
    headline: ['동시 요청 상황에서', '정합성을 고민했습니다.'],
    description: [
      'K-server는 메뉴 조회, 포인트 충전, 주문 결제,\n인기 메뉴 집계를 다루는 커피 주문 시스템입니다.',
      '요구사항을 해석하고 설계 방향을 정리하며,\n주문 흐름과 데이터 일관성을 어떻게 안정적으로 다룰지 고민했습니다.',
    ],
    role: '백엔드 전체 설계 및 구현',
    stack: ['Spring Boot', 'Redisson', 'Kafka', 'MySQL', 'Docker', 'k6'],
    keywords: ['Redis Lock', 'DB Lock', 'Kafka Event', 'Transaction', 'Concurrency'],
    metadata: [
      { label: 'ROLE', value: 'Backend' },
      { label: 'TYPE', value: 'Solo Project' },
      { label: 'FOCUS', value: 'Order & Consistency' },
    ],
    href: '/work/k-server',
    github: 'https://github.com/Ho-jin98/k-server-project',
    overview:
      '다중 인스턴스와 동시 요청을 가정하고 주문, 포인트, 이벤트 처리 사이의 데이터 정합성을 학습하고 적용한 프로젝트입니다.',
  },
  {
    number: '04',
    projectNumber: '03',
    slug: 'readys7',
    name: "READY'S7",
    title: "Ready's7",
    landingTitle: 'Ready’s7',
    tagline: '클라이언트와 개발자를 연결하는 개발자 용역 플랫폼',
    subtitle: '개발자 용역 매칭 플랫폼',
    period: '2026.03 — 2026.04',
    team: '5인 팀 프로젝트',
    headline: ['Redis Cache로', '반복 조회를 줄여봤습니다.'],
    description: [
      'Ready’s7은 프로젝트를 의뢰하려는 클라이언트와 기술 역량을 가진 개발자를 연결하는 용역 매칭 플랫폼입니다.',
      '개발자는 제안서를 통해 프로젝트에 지원하고,\n클라이언트는 포트폴리오와 리뷰를 바탕으로 적합한 파트너를 찾을 수 있도록 기획했습니다.',
    ],
    role: '인증/인가 · 클라이언트 · 관리자 · 통합 검색',
    stack: ['Spring Security', 'JWT', 'QueryDSL', 'Redis', 'MySQL', 'k6'],
    keywords: ['Redis Cache', 'Search', 'K6 Test', 'Performance', 'Query Optimization'],
    metadata: [
      { label: 'ROLE', value: 'Backend' },
      { label: 'TYPE', value: 'Team Project' },
      { label: 'FOCUS', value: 'Developer Matching Platform' },
    ],
    href: '/work/readys7',
    github: 'https://github.com/Ready-s7/Readys7-project',
    overview:
      '검색 도메인에서 반복 조회 비용을 줄이기 위해 Redis Cache를 적용하고 같은 조건의 부하 테스트로 차이를 확인한 프로젝트입니다.',
  },
];

export const capabilities = [
  {
    number: '01',
    title: 'Backend',
    description: 'Spring Boot 기반으로 API, 인증, 상태 변경, 트랜잭션 흐름을 구현했습니다.',
    items: 'Java 17 · Spring Boot · Spring Security · JPA · QueryDSL',
  },
  {
    number: '02',
    title: 'Data & Messaging',
    description: 'Redis와 Kafka를 활용해 캐시, 이벤트 처리, 재시도 흐름을 다뤘습니다.',
    items: 'MySQL · Redis · Redisson · Kafka · Spring Cache',
  },
  {
    number: '03',
    title: 'Quality',
    description: '테스트 코드와 부하 테스트를 통해 기능 동작과 개선 효과를 확인했습니다.',
    items: 'JUnit 5 · Mockito · MockMvc · K6 · E2E Scenarios',
  },
  {
    number: '04',
    title: 'Product Connection',
    description:
      '백엔드 흐름이 실제 화면과 연결되는지 확인하며 필요한 프론트 영역도 함께 다뤘습니다.',
    items: 'React · TypeScript · Kakao Maps · Geolocation API · Figma',
  },
];
