export interface CaseStudyFact {
  label: string;
  value: string;
}

export interface CaseStudyBlock {
  label: string;
  text: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  note?: string;
  tone?: 'primary' | 'dark';
}

export interface CaseStudySection {
  number: string;
  id: string;
  title: string;
  navTitle: string;
  lead: string;
  facts?: CaseStudyFact[];
  bullets?: string[];
  flow?: string[];
  states?: CaseStudyFact[];
  blocks?: CaseStudyBlock[];
  metrics?: CaseStudyMetric[];
}

export interface CaseStudyContent {
  projectLabel: string;
  sections: CaseStudySection[];
}

export const caseStudies: Record<string, CaseStudyContent> = {
  hankkipot: {
    projectLabel: '한끼팟',
    sections: [
      {
        number: '01',
        id: 'overview',
        title: 'Overview',
        navTitle: 'Overview',
        lead:
          '오프라인 만남이 장소 인증에서 완료와 정산까지 이어지는 과정을 정책과 상태 변화 중심으로 다뤘습니다.',
        facts: [
          { label: 'PROJECT', value: '한끼팟' },
          { label: 'ROLE', value: 'Backend · UI/UX Connection' },
          { label: 'SCOPE', value: '만남 인증 · 위치 · 관리자' },
          { label: 'CASE STUDY', value: 'GPS 인증 · QR 완료 구조' },
        ],
      },
      {
        number: '02',
        id: 'problem',
        title: 'Problem',
        navTitle: 'Problem',
        lead: '오프라인 만남 서비스에서는 매칭 이후의 신뢰 흐름이 필요했습니다.',
        bullets: [
          '매칭이 성사되어도 실제 만남이 완료됐는지 판단하기 어려웠습니다.',
          '약속 장소 도착과 만남 완료 여부를 각각 확인할 기준이 필요했습니다.',
          '노쇼 판정과 책임비 정산이 인증 상태와 일관되게 연결되어야 했습니다.',
          'GPS, QR, 상태 변경과 정산을 하나의 서비스 흐름으로 설계해야 했습니다.',
        ],
      },
      {
        number: '03',
        id: 'flow',
        title: 'Flow',
        navTitle: 'Flow',
        lead: '게시글 등록부터 만남 완료와 책임비 정산까지의 상태 흐름을 분리해 연결했습니다.',
        flow: [
          'Post 등록',
          'Match 생성',
          'GPS 장소 인증',
          'QR 만남 인증',
          'Match 완료',
          '책임비 정산',
          'Post 완료',
        ],
        states: [
          { label: 'MATCH', value: 'MATCHED → COMPLETED' },
          { label: 'POST', value: 'ACTIVE → COMPLETE' },
          { label: 'VERIFICATION', value: 'PENDING → VERIFIED / DONE' },
        ],
      },
      {
        number: '04',
        id: 'gps-verification',
        title: 'GPS Verification',
        navTitle: 'GPS Verification',
        lead: 'SVG 프로토타입을 실제 장소 검색과 서버 검증이 가능한 GPS 인증 흐름으로 전환했습니다.',
        blocks: [
          {
            label: 'PROBLEM',
            text: '고정 좌표 SVG는 실제 장소 검색과 미터 단위 거리 검증에 사용할 수 없었습니다.',
          },
          {
            label: 'DECISION',
            text: '국내 장소 검색과 지도 표시를 함께 지원하는 Kakao Maps SDK를 선택했습니다.',
          },
          {
            label: 'IMPLEMENTATION',
            text: '장소 검색, 약속 장소와 참여자 위치 표시를 연결하고 현재 좌표를 백엔드 API로 전달했습니다.',
          },
          {
            label: 'VERIFICATION',
            text: '클라이언트 계산만 신뢰하지 않고 서버에서 약속 장소와 현재 위치의 거리를 다시 검증했습니다.',
          },
        ],
        bullets: [
          'Codex를 활용해 낯선 React 구조와 지도 SDK를 파악했습니다.',
          '생성 결과를 그대로 적용하지 않고 기존 API와 상태 구조에 맞게 수정하고 검증했습니다.',
        ],
      },
      {
        number: '05',
        id: 'qr-completion',
        title: 'QR Completion',
        navTitle: 'QR Completion',
        lead: '단체 매칭에서도 신청자마다 독립적으로 완료와 책임비 환급을 처리하도록 구조를 분리했습니다.',
        blocks: [
          {
            label: 'PROBLEM',
            text: '한 신청자의 QR 인증 지연이 먼저 인증한 신청자의 완료와 정산까지 막고 있었습니다.',
          },
          {
            label: 'DECISION',
            text: 'QR 토큰은 Post 단위로 공유하되 완료 상태와 정산 기준은 Match 단위로 분리했습니다.',
          },
          {
            label: 'IMPLEMENTATION',
            text: '인증한 신청자의 Match만 완료하고 위치 데이터 삭제와 책임비 환급을 같은 흐름에서 처리했습니다.',
          },
          {
            label: 'RESULT',
            text: '신청자별 완료 상태를 유지하면서 모든 참여자가 끝난 경우에만 Post를 최종 완료했습니다.',
          },
        ],
      },
      {
        number: '06',
        id: 'result',
        title: 'Result & Learned',
        navTitle: 'Result',
        lead: '인증 기능을 개별 API가 아니라 만남 완료와 정산까지 이어지는 하나의 정책 흐름으로 연결했습니다.',
        bullets: [
          'GPS 장소 인증부터 QR 인증과 책임비 정산까지 사용자 흐름을 연결했습니다.',
          '신청자 완료는 Match, 전체 만남 완료는 Post 단위로 분리했습니다.',
          '낯선 프론트 구조와 지도 SDK를 학습해 백엔드 API와 화면 상태를 연결했습니다.',
          '구현 전에 정책과 상태 전이를 먼저 정리하는 것이 중요하다는 점을 배웠습니다.',
        ],
      },
    ],
  },
  'k-server': {
    projectLabel: 'K-server',
    sections: [
      {
        number: '01',
        id: 'overview',
        title: 'Overview',
        navTitle: 'Overview',
        lead:
          '커피 주문 시스템을 주제로 다중 인스턴스 환경의 동시성, 데이터 일관성과 후속 이벤트 시점을 설계했습니다.',
        facts: [
          { label: 'PROJECT', value: 'Coffee Order System' },
          { label: 'TYPE', value: 'Solo Project' },
          { label: 'SCOPE', value: '메뉴 · 포인트 · 주문 · 인기 메뉴' },
          { label: 'CORE', value: 'Concurrency · Consistency · Event' },
        ],
      },
      {
        number: '02',
        id: 'problem',
        title: 'Problem',
        navTitle: 'Problem',
        lead: '동일 사용자의 주문과 충전이 겹치면 포인트 잔액과 거래 이력이 어긋날 수 있었습니다.',
        bullets: [
          '동시 차감으로 포인트 잔액이 음수가 될 수 있었습니다.',
          '거래 이력과 실제 잔액 사이에 불일치가 생길 수 있었습니다.',
          '여러 서버 인스턴스가 동일 사용자의 요청을 동시에 처리할 수 있었습니다.',
          '롤백된 주문의 후속 집계 이벤트는 실행되지 않아야 했습니다.',
        ],
      },
      {
        number: '03',
        id: 'order-flow',
        title: 'Order Flow',
        navTitle: 'Order Flow',
        lead: '락 획득부터 DB 커밋과 후속 이벤트 발행까지 주문 경계를 명확히 나눴습니다.',
        flow: [
          'Order Request',
          'User Lock',
          'Point Validation',
          'Point Deduction',
          'Order Save',
          'Commit',
          'Event Publish',
          'Popular Menu Count',
        ],
      },
      {
        number: '04',
        id: 'point-consistency',
        title: 'Point Consistency',
        navTitle: 'Point Consistency',
        lead: 'Redis 분산락과 DB 비관락의 책임을 나눠 동일 사용자의 포인트 변경을 직렬화했습니다.',
        blocks: [
          {
            label: 'PROBLEM',
            text: '동일 사용자의 주문이 동시에 처리되면 포인트 차감이 중복되거나 갱신이 누락될 수 있었습니다.',
          },
          {
            label: 'DECISION',
            text: '사용자 단위 Redis Lock을 적용하고 트랜잭션 내부에서는 User 행에 DB 비관락을 적용했습니다.',
          },
          {
            label: 'IMPLEMENTATION',
            text: 'Facade는 분산락, Service는 주문 트랜잭션을 담당해 커밋이 끝난 뒤 락이 해제되도록 분리했습니다.',
          },
        ],
        metrics: [
          { label: 'CONCURRENT ORDERS', value: '100', tone: 'dark' },
          { label: 'SUCCESS', value: '3', tone: 'primary' },
          { label: 'REJECTED', value: '97' },
          { label: 'FINAL BALANCE', value: '0P', tone: 'primary' },
          { label: 'CHARGE REQUESTS', value: '50' },
          { label: 'REFLECTED', value: '50,000P', note: '누락 없이 반영' },
        ],
      },
      {
        number: '05',
        id: 'event-handling',
        title: 'Event Handling',
        navTitle: 'Event Handling',
        lead: '주문 트랜잭션의 성공 여부와 Kafka 후속 처리의 실행 시점을 분리했습니다.',
        blocks: [
          {
            label: 'PROBLEM',
            text: '주문과 포인트 차감이 롤백됐는데 이벤트가 발행되면 잘못된 인기 메뉴 집계가 남을 수 있었습니다.',
          },
          {
            label: 'DECISION',
            text: '주문 트랜잭션 안에서 Kafka를 직접 호출하지 않고 내부 도메인 이벤트를 먼저 발행했습니다.',
          },
          {
            label: 'IMPLEMENTATION',
            text: '@TransactionalEventListener(AFTER_COMMIT)으로 DB 커밋 이후에만 Kafka 발행을 시도했습니다.',
          },
          {
            label: 'RESULT',
            text: '후속 처리 실패가 완료된 주문 트랜잭션에 영향을 주지 않도록 재시도와 DLT 흐름을 분리했습니다.',
          },
        ],
      },
      {
        number: '06',
        id: 'result',
        title: 'Result & Learned',
        navTitle: 'Result',
        lead: '락, 트랜잭션과 이벤트 발행 시점을 하나의 정합성 경계로 함께 설계했습니다.',
        bullets: [
          '동시 주문과 충전 요청에서도 포인트 잔액과 거래 이력의 일관성을 확인했습니다.',
          'DB 커밋 이후에만 이벤트를 발행해 롤백 주문의 후속 처리를 차단했습니다.',
          '락의 범위와 트랜잭션 경계, 이벤트 시점은 따로가 아니라 함께 설계해야 했습니다.',
          '기능 구현만큼 선택한 구조의 이유를 설명할 수 있어야 한다는 점을 배웠습니다.',
        ],
      },
    ],
  },
  readys7: {
    projectLabel: 'Ready’s7',
    sections: [
      {
        number: '01',
        id: 'overview',
        title: 'Overview',
        navTitle: 'Overview',
        lead:
          '개발자 용역 플랫폼에서 통합 검색을 담당하며 반복 조회 성능과 데이터 변경에 따른 캐시 정합성을 다뤘습니다.',
        facts: [
          { label: 'PROJECT', value: 'Developer Matching Platform' },
          { label: 'TYPE', value: 'Team Project' },
          { label: 'ROLE', value: '검색 · 인증/인가 · 고객 · 관리자' },
          { label: 'CASE STUDY', value: 'Cache Performance · Consistency' },
        ],
      },
      {
        number: '02',
        id: 'problem',
        title: 'Problem',
        navTitle: 'Problem',
        lead: '여러 도메인을 함께 조회하는 통합 검색은 같은 키워드가 반복될수록 DB 비용도 반복됐습니다.',
        bullets: [
          '프로젝트, 카테고리, 스킬과 개발자 데이터를 한 번에 조회했습니다.',
          '같은 키워드 검색이 반복될 때 동일한 복합 DB 조회가 계속 실행됐습니다.',
          '키워드가 같아도 페이지 번호와 크기가 다르면 결과가 섞이면 안 됐습니다.',
          '단건 요청이 아닌 동시 사용자 환경에서 개선 효과를 확인해야 했습니다.',
        ],
      },
      {
        number: '03',
        id: 'search-flow',
        title: 'Search Flow',
        navTitle: 'Search Flow',
        lead: '검색 조건을 캐시 키로 분리하고 Hit와 Miss에 따라 Redis와 DB 조회 경로를 나눴습니다.',
        flow: [
          'Search Request',
          'Cache Lookup',
          'Cache Hit / Miss',
          'DB Query',
          'Cache Store',
          'Response',
        ],
        states: [{ label: 'CACHE KEY', value: 'keyword + page + size' }],
      },
      {
        number: '04',
        id: 'cache-performance',
        title: 'Cache Performance',
        navTitle: 'Cache Performance',
        lead: '동일 조건의 k6 시나리오로 Redis Cache 적용 전후의 차이를 비교했습니다.',
        blocks: [
          {
            label: 'PROBLEM',
            text: '동일 키워드가 반복될 때 프로젝트, 카테고리, 스킬과 개발자 복합 조회 비용이 계속 발생했습니다.',
          },
          {
            label: 'DECISION',
            text: '다중 인스턴스에서도 공유할 수 있는 Redis Cache를 선택했습니다.',
          },
          {
            label: 'IMPLEMENTATION',
            text: '@Cacheable과 TTL 5분을 적용하고 키워드, 페이지 번호와 페이지 크기로 캐시 키를 구성했습니다.',
          },
          {
            label: 'VERIFICATION',
            text: '프로젝트 50,009건과 k6 Ramp-up 시나리오로 캐시 적용 전후를 같은 조건에서 측정했습니다.',
          },
        ],
        metrics: [
          { label: 'BEFORE · AVG RESPONSE', value: '1,940ms', tone: 'dark' },
          { label: 'AFTER · AVG RESPONSE', value: '3.73ms', tone: 'primary' },
          { label: 'BEFORE · THROUGHPUT', value: '16.19 TPS' },
          { label: 'AFTER · THROUGHPUT', value: '46.68 TPS', tone: 'primary' },
        ],
      },
      {
        number: '05',
        id: 'cache-consistency',
        title: 'Cache Consistency',
        navTitle: 'Cache Consistency',
        lead: '검색 속도뿐 아니라 원본 데이터가 바뀌었을 때 오래된 결과를 언제 비울지도 함께 설계했습니다.',
        blocks: [
          {
            label: 'PROBLEM',
            text: '프로젝트나 사용자 정보가 변경된 뒤에도 이전 검색 결과가 반환될 수 있었습니다.',
          },
          {
            label: 'DECISION',
            text: '여러 키워드와 페이지 캐시에서 특정 데이터의 키를 역추적하는 복잡도를 피했습니다.',
          },
          {
            label: 'IMPLEMENTATION',
            text: '변경 경로에 @CacheEvict(allEntries = true)를 적용하고 다음 Cache Miss에서 최신 결과를 적재했습니다.',
          },
          {
            label: 'RESULT',
            text: 'TTL 5분을 안전장치로 두고 데이터 변경 후 최신 검색 결과가 다시 캐시되도록 구성했습니다.',
          },
        ],
      },
      {
        number: '06',
        id: 'result',
        title: 'Result & Learned',
        navTitle: 'Result',
        lead: '캐시는 빠르게 만드는 기능뿐 아니라 언제, 어떤 기준으로 비울지까지 포함하는 설계였습니다.',
        metrics: [
          { label: 'AVG RESPONSE', value: '1,940ms → 3.73ms', tone: 'primary' },
          { label: 'THROUGHPUT', value: '16.19 → 46.68 TPS', tone: 'primary' },
        ],
        bullets: [
          '반복 검색의 응답 시간과 처리량 차이를 같은 부하 조건에서 확인했습니다.',
          '성능 개선과 함께 데이터 변경 시 캐시 정합성도 고려했습니다.',
          '캐시 키는 검색 조건을 충분히 구분해야 결과가 섞이지 않았습니다.',
          '캐시 도입보다 무효화 정책을 함께 설명할 수 있어야 한다는 점을 배웠습니다.',
        ],
      },
    ],
  },
};
