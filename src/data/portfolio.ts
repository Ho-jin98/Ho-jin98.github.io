export const profile = {
  name: '정호진',
  nameEn: 'HOJIN',
  role: 'Backend Engineer',
  email: 'hohoj98@naver.com',
  github: 'https://github.com/Ho-jin98',
  blog: '',
  location: 'SEOUL, KR',
  introduction: [
    '낯선 기술도 빠르게 익히고,',
    '실제 서비스 흐름에 적용해왔습니다.',
  ],
};

export const projects = [
  {
    number: '02',
    projectNumber: '01',
    slug: 'hankkipot',
    name: 'HANKKIPOT',
    title: '한끼팟',
    subtitle: '대학생 식사 매칭 플랫폼',
    period: '2026.05 — 2026.06',
    team: '5인 팀 프로젝트',
    headline: ['GPS와 QR로', '만남 인증 흐름을 구현했습니다.'],
    description: [
      '한끼팟은 개발자들이 식사팟을 만들고 참여할 수 있는 오프라인 만남 매칭 플랫폼입니다.',
      'GPS 장소 인증, QR 만남 인증, 노쇼 판정, 관리자 이의제기 처리 흐름을 중심으로 실제 만남이 안전하게 완료되기 위한 백엔드 흐름을 구현했습니다.',
    ],
    role: '만남 인증 · 위치 · 관리자 · UI/UX',
    stack: ['Spring Boot', 'JPA', 'Redis', 'React', 'TypeScript', 'Kakao Maps'],
    keywords: ['GPS 인증', 'QR 인증', '노쇼 판정', '관리자 처리', '포인트 정산'],
    metadata: [
      { label: 'TYPE', value: 'Team Project' },
      { label: 'ROLE', value: 'Backend' },
      { label: 'FOCUS', value: 'GPS · QR · No-show · Admin' },
      { label: 'PERIOD', value: '2026.05 — 2026.06' },
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
    subtitle: '다중 인스턴스를 가정한 커피 주문 시스템',
    period: '2026.04 — 2026.05',
    team: '1인 프로젝트',
    headline: ['동시 요청 상황에서', '정합성을 고민했습니다.'],
    description: [
      'K-server는 다중 인스턴스 환경에서 주문과 데이터 정합성을 안정적으로 처리하기 위해 만든 프로젝트입니다.',
      'Redis 분산락과 DB 락을 비교하며 적용했고, 트랜잭션 이후 이벤트 처리 흐름을 구성하며 동시성 상황에서 데이터가 어긋나지 않도록 구현 방향을 고민했습니다.',
    ],
    role: '백엔드 전체 설계 및 구현',
    stack: ['Spring Boot', 'Redisson', 'Kafka', 'MySQL', 'Docker', 'k6'],
    keywords: ['Redis Lock', 'DB Lock', 'Kafka Event', 'Transaction', 'Concurrency'],
    metadata: [
      { label: 'TYPE', value: 'Solo Project' },
      { label: 'ROLE', value: 'Backend' },
      { label: 'FOCUS', value: 'Lock · Transaction · Event' },
      { label: 'PERIOD', value: '2026.04 — 2026.05' },
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
    subtitle: '개발자 용역 매칭 플랫폼',
    period: '2026.03 — 2026.04',
    team: '5인 팀 프로젝트',
    headline: ['Redis Cache로', '반복 조회를 줄여봤습니다.'],
    description: [
      "Ready's7은 개발자 용어 기반 매칭과 검색 흐름을 다룬 프로젝트입니다.",
      '통합 검색에 Redis Cache를 적용하고, 동일 조건의 반복 조회를 줄이는 방향으로 개선했으며 K6 테스트를 통해 적용 전후의 차이를 확인했습니다.',
    ],
    role: '인증/인가 · 클라이언트 · 관리자 · 통합 검색',
    stack: ['Spring Security', 'JWT', 'QueryDSL', 'Redis', 'MySQL', 'k6'],
    keywords: ['Redis Cache', 'Search', 'K6 Test', 'Performance', 'Query Optimization'],
    metadata: [
      { label: 'TYPE', value: 'Team Project' },
      { label: 'ROLE', value: 'Backend' },
      { label: 'FOCUS', value: 'Search · Cache · K6' },
      { label: 'PERIOD', value: '2026.03 — 2026.04' },
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
