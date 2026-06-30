export const profile = {
  name: '정호진',
  nameEn: 'HOJIN',
  role: 'Backend Engineer',
  email: 'hohoj98@naver.com',
  github: 'https://github.com/Ho-jin98',
  location: 'SEOUL, KR',
  introduction: [
    '새로운 기술과 낯선 영역을 빠르게 학습하고,',
    '실제로 동작하는 서비스 흐름으로 연결합니다.',
  ],
};

export const projects = [
  {
    number: '01',
    title: '한끼팟',
    subtitle: '대학생 식사 매칭 플랫폼',
    period: '2026.05 — 2026.06',
    kind: 'TEAM / 5',
    href: 'https://github.com/Team3-Final-Project-SNS/Final-project',
    summary:
      'GPS 장소 인증부터 QR 만남 완료와 책임비 정산까지, 오프라인 만남의 신뢰 흐름을 설계하고 구현했습니다.',
    role: '만남 인증 · 위치 · 관리자 · UI/UX',
    stack: ['Spring Boot', 'JPA', 'Redis', 'React', 'TypeScript', 'Kakao Maps'],
    metrics: [
      { value: '60m', label: '서버 GPS 판정 반경' },
      { value: '3s', label: '위치 갱신 주기' },
      { value: 'E2E', label: '전체 회귀 시나리오' },
    ],
    accent: 'orange',
  },
  {
    number: '02',
    title: 'K-server',
    subtitle: '다중 인스턴스를 가정한 커피 주문 시스템',
    period: '2026.04 — 2026.05',
    kind: 'SOLO',
    href: 'https://github.com/Ho-jin98/k-server-project',
    summary:
      'Redis 분산락과 DB 비관락으로 포인트 정합성을 지키고, 커밋 이후 Kafka 이벤트 처리 흐름을 구성했습니다.',
    role: '백엔드 전체 설계 및 구현',
    stack: ['Spring Boot', 'Redisson', 'Kafka', 'MySQL', 'Docker', 'k6'],
    metrics: [
      { value: '3/100', label: '잔액 범위 내 주문 성공' },
      { value: '0P', label: '동시 주문 후 최종 잔액' },
      { value: '60/60', label: 'Kafka 처리 검증' },
    ],
    accent: 'graphite',
  },
  {
    number: '03',
    title: "Ready's7",
    subtitle: '개발자 용역 매칭 플랫폼',
    period: '2026.03 — 2026.04',
    kind: 'TEAM / 5',
    href: 'https://github.com/Ready-s7/Readys7-project',
    summary:
      '통합 검색에 Redis Cache를 적용하고 동일 조건의 k6 테스트로 반복 조회 성능 개선 효과를 검증했습니다.',
    role: '인증/인가 · 클라이언트 · 관리자 · 통합 검색',
    stack: ['Spring Security', 'JWT', 'QueryDSL', 'Redis', 'MySQL', 'k6'],
    metrics: [
      { value: '1.94s', label: '캐시 적용 전 평균' },
      { value: '3.73ms', label: 'Redis 적용 후 평균' },
      { value: '0%', label: '100 VU 실패율' },
    ],
    accent: 'orange',
  },
];

export const capabilities = [
  {
    number: '01',
    title: 'Backend',
    items: 'Java 17 · Spring Boot · Spring Security · JPA · QueryDSL',
  },
  {
    number: '02',
    title: 'Data & Messaging',
    items: 'MySQL · Redis · Redisson · Kafka · Spring Cache',
  },
  {
    number: '03',
    title: 'Quality',
    items: 'JUnit 5 · Mockito · MockMvc · k6 · E2E Scenarios',
  },
  {
    number: '04',
    title: 'Product Connection',
    items: 'React · TypeScript · Kakao Maps · Geolocation API · Figma',
  },
];
