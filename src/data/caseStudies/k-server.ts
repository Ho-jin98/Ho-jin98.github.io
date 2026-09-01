import type { CaseStudyContent } from './types';

export const kServerCaseStudy: CaseStudyContent = {
    projectLabel: 'K-server',
    description:
      '커피 주문 백엔드에서 동일 사용자 포인트 경합과 Kafka 후속 처리 시점을 Redis 분산락, DB 비관락, AFTER_COMMIT 이벤트 발행, k6 검증으로 정리한 Case Study입니다.',
    sections: [
      {
        number: '01',
        id: 'overview',
        title: '프로젝트 개요',
        navTitle: '프로젝트 개요',
        navSubtitle: '서비스 소개',
        lead: '메뉴를 고르고 포인트로 결제하며, 최근 인기 메뉴까지 확인할 수 있도록 구성한 커피숍 주문 백엔드입니다.',
        content: [
          {
            type: 'kServerOverview',
            intro: {
              heading: '서비스 소개',
              paragraphs: [
                'K-server는 사용자가 커피 메뉴를 조회하고 검색하며,\n포인트를 충전해 원하는 메뉴를 주문할 수 있는 커피숍 주문 서비스입니다.',
                '하나의 주문에 여러 메뉴와 수량을 선택할 수 있고, 보유 포인트로 결제합니다.\n주문 이후에는 주문 내역과 포인트 거래 내역을 확인할 수 있으며,\n완료된 주문은 취소와 전액 환불까지 이어집니다.',
                '또한 최근 7일간 누적된 인기 점수를 바탕으로 인기 메뉴 TOP 3를 제공해,\n사용자가 최근 관심도가 높은 메뉴를 확인할 수 있도록 구성했습니다.\n서비스 기능을 구현하는 과정에서 Redis는 주문 동시성 제어와\n메뉴 캐시·인기 메뉴 집계에, Kafka는 주문 이후 후속 처리에 적용했습니다.',
              ],
            },
            highlights: ['포인트 기반 결제', '여러 메뉴 주문', '주문 취소 및 환불', '최근 7일 인기 메뉴'],
            visualSrc: '/k-server-images/k-server-overview-hero-integrated.png',
            visualAlt: '커피 메뉴, 포인트 결제, 주문 완료, 최근 인기 메뉴를 표현한 K-server 3D 일러스트레이션',
          },
        ],
      },
      {
        number: '02',
        id: 'order-flow',
        title: '문제 정의',
        navTitle: '문제 정의',
        navSubtitle: '해결해야 했던 두 문제',
        lead: 'K-server의 주문 처리 과정에서 해결해야 했던\n두 가지 문제를 정의했습니다.',
        content: [
          {
            type: 'prose',
            paragraphs: [
              '주문은 포인트 잔액 변경과 주문 저장으로 끝나지 않고, 이후 Kafka를 통한 후속 처리까지 이어집니다.\nK-server에서는 동시에 발생하는 포인트 변경 요청의 정합성과 DB 처리 결과가 확정된 뒤 후속 작업을 시작하는 실행 순서를 각각 분리해 다룰 문제로 정의했습니다.',
            ],
          },
          {
            type: 'tabs',
            tabs: [
              {
                id: 'point-consistency-problem',
                label: '주문·포인트 정합성',
                title: '주문, 충전, 취소가 같은 사용자 포인트 잔액을 변경하고 있었습니다.',
                text: '동일 사용자의 주문 요청이 동시에 처리되면 여러 요청이 같은 포인트 잔액을 기준으로 주문 가능 여부를 판단할 수 있습니다.\n이 경우 실제 잔액보다 많은 주문이 승인되거나, 최종 잔액과 거래 이력이 서로 맞지 않을 수 있습니다.\n\n또한 포인트는 주문 시 차감될 뿐 아니라 충전 시 증가하고, 주문 취소 시 다시 환불됩니다.\n따라서 주문 요청만 따로 제어하는 것으로는 충분하지 않았고, 동일한 User 잔액을 변경하는 여러 경로를 함께 고려할 필요가 있었습니다.',
                diagramsLayout: 'columns',
                diagrams: [
                  {
                    type: 'hub',
                    density: 'compact',
                    connectorTone: 'subtle',
                    spacingAfter: 'roomy',
                    label: '같은 잔액을 변경하는 경로',
                    sources: [
                      { title: '충전', text: '포인트 증가' },
                      { title: '주문', text: '포인트 차감' },
                      { title: '취소 / 환불', text: '포인트 반환' },
                    ],
                    target: { title: 'User.pointBalance', tone: 'primary' },
                  },
                  {
                    type: 'merge',
                    density: 'compact',
                    connectorTone: 'subtle',
                    label: '동시 요청이 발생하면',
                    sources: [
                      { title: '요청 A', text: '잔액 9,000P 확인' },
                      { title: '요청 B', text: '잔액 9,000P 확인' },
                    ],
                    merge: { title: '같은 잔액을 기준으로 처리' },
                    result: { title: '초과 주문 / 최종 잔액 불일치 위험', tone: 'primary' },
                  },
                ],
                cards: {
                  label: '지켜야 했던 기준',
                  columns: 3,
                  items: [
                    { label: '초과 주문 방지', text: '동일 사용자의 동시 주문이 같은 잔액을 기준으로 처리될 경우 초과 주문으로 이어질 수 있어, 요청 순서를 제어할 필요가 있었습니다.' },
                    { label: '잔액 변경의 최종 정합성', text: '주문, 충전, 취소처럼 같은 잔액을 변경하는 여러 경로에서 최종 포인트 정합성을 함께 고려할 필요가 있었습니다.' },
                    { label: '사용자별 독립 처리', text: '한 사용자의 주문 제어가 다른 사용자의 주문 처리까지 영향을 줄 수 있어, 사용자 단위로 제어 범위를 제한할 필요가 있었습니다.' },
                  ],
                },
              },
              {
                id: 'kafka-timing-problem',
                label: 'DB / Kafka 처리 시점',
                title: 'DB에 확정되지 않은 주문이 Kafka 후속 처리로 넘어갈 수 있었습니다.',
                text: '주문 트랜잭션 내부에서 Kafka 메시지를 직접 발행하면, 메시지가 먼저 브로커에 전달된 뒤 DB 트랜잭션이 롤백되는 상황이 발생할 수 있습니다.\n그러면 DB에는 존재하지 않는 주문을 기준으로 Consumer가 주문 완료 처리나 인기 메뉴 집계를 시작할 수 있습니다.\n\n반대로 인기 메뉴 집계처럼 주문 이후의 부가 작업이 실패하면, 이미 성공한 포인트 차감과 주문 저장까지 함께 영향을 받을 가능성이 있습니다.\n따라서 주문의 핵심 DB 처리와 Kafka 후속 작업이 언제 이어져야 하는지를 명확하게 나눌 필요가 있었습니다.',
                diagrams: [
                  {
                    type: 'sequence',
                    density: 'compact',
                    connectorTone: 'subtle',
                    layout: 'deck',
                    steps: [
                      { title: '주문 DB 처리 중' },
                      { title: 'Kafka 메시지 발행' },
                      { title: 'Consumer 후속 처리 시작' },
                      { title: 'DB 트랜잭션 롤백' },
                      { title: 'DB 상태와 후속 처리 결과 불일치', tone: 'primary' },
                    ],
                  },
                ],
                cards: {
                  label: '분리해야 했던 두 가지',
                  columns: 2,
                  items: [
                    { label: '발행 시점', text: 'DB 커밋 성공이 확인된 주문을 기준으로\nKafka 후속 처리를 이어갈 시점을 분리할 필요가 있었습니다.' },
                    { label: '실패 영향', text: '인기 메뉴 집계 같은 후속 작업의 실패가 핵심 주문 처리까지 영향을 줄 수 있어,\n실패 영향 범위를 분리해 고려할 필요가 있었습니다.' },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        number: '03',
        id: 'order-point-consistency',
        title: '동시 요청 환경에서 주문과 포인트 정합성 확보',
        navTitle: '주문·포인트 정합성',
        navSubtitle: 'Redis 분산락과 DB 비관락',
        lead: '주문 진입은 Redis 분산락으로,\n실제 포인트 변경은 DB 비관락으로 나눠 보호했습니다.',
        content: [
          {
            type: 'tabs',
            tabs: [
              {
                id: 'lock-design',
                label: '보호 설계',
                title: '두 락은 같은 문제를 중복해서 해결하는 것이 아니라, 서로 다른 시점과 범위를 보호합니다.',
                text: 'Redis 분산락은 같은 사용자의 주문 요청이 DB 트랜잭션에 동시에 진입하지 않도록 제어하고,\nDB 비관락은 실제 User 포인트 잔액을 변경하는 시점의 정합성을 보호합니다.',
                comparison: {
                  columns: ['Redis 분산락', 'DB 비관락'],
                  highlightColumn: 1,
                  rows: [
                    { label: '담당', values: ['같은 사용자의 주문 요청 동시 진입 제어', '실제 사용자 포인트 잔액 변경 보호'] },
                    { label: '적용 위치', values: ['주문 트랜잭션 시작 전', '사용자 포인트 정보 조회 시'] },
                    { label: '목적', values: ['동일 사용자의 주문 트랜잭션 동시 진입 제한', '주문·충전·취소가 변경하는 최종 포인트 정합성 보호'] },
                    { label: '실제 구현', values: ['lock:order:{userId} / tryLock(3s, 5s)', 'PESSIMISTIC_WRITE'] },
                  ],
                },
                subsection: {
                  title: '분산락과 비관락',
                  paragraphs: [
                    'Redis 분산락은 같은 사용자의 주문 요청이 DB 트랜잭션에 동시에 진입하지 않도록 제어합니다.\n주문용 분산락의 적용 범위는 주문 경로로 두고, 충전과 취소를 포함한 실제 잔액 변경은 DB 비관락에서 공통으로 보호했습니다.',
                    '따라서 주문·충전·취소가 User.pointBalance를 변경하는 시점에는 User row를 PESSIMISTIC_WRITE로 조회해 최종 정합성을 보호했습니다.',
                  ],
                  callout: 'Redis 분산락은 주문 진입 제어, DB 비관락은 실제 잔액 변경 보호를 담당합니다.',
                },
              },
              {
                id: 'execution-flow',
                label: '실행 흐름',
                title: '분산락이 주문 트랜잭션을 감싸도록 역할을 분리했습니다.',
                text: 'OrderFacade가 사용자별 분산락을 획득한 뒤 OrderService의 주문 트랜잭션을 호출합니다.',
                diagrams: [
                  {
                    type: 'sequence',
                    layout: 'roles',
                    label: '코드 역할 분리',
                    footer: '정상 처리 흐름에서는 OrderService의 트랜잭션이 종료된 뒤\nFacade 호출 흐름으로 돌아와 분산락을 해제합니다.',
                    steps: [
                      { title: 'OrderFacade', text: '사용자별 Redis 분산락\n획득 / 해제' },
                      { title: 'OrderService', text: '@Transactional 주문 처리\nUser row 비관락 조회\n포인트 변경 및 주문 저장' },
                    ],
                  },
                  {
                    type: 'sequence',
                    layout: 'phased',
                    label: '주문·포인트 정합성 처리 흐름',
                    phases: [
                      {
                        title: '진입 및 잔액 변경',
                        steps: [
                          { title: '사용자별 분산락 획득' },
                          { title: '주문 트랜잭션 시작' },
                          { title: '사용자 포인트 정보 잠금' },
                          { title: '포인트 차감' },
                        ],
                      },
                      {
                        title: '저장 및 종료',
                        steps: [
                          { title: '포인트 거래 이력 저장' },
                          { title: '주문 저장' },
                          { title: 'DB 커밋' },
                          { title: '분산락 해제' },
                        ],
                      },
                    ],
                    steps: [
                      { title: '사용자별 분산락 획득' },
                      { title: '주문 트랜잭션 시작' },
                      { title: '사용자 포인트 정보 잠금' },
                      { title: '포인트 차감' },
                      { title: '포인트 거래 이력 저장' },
                      { title: '주문 저장' },
                      { title: 'DB 커밋' },
                      { title: '분산락 해제' },
                    ],
                  },
                ],
              },
              {
                id: 'order-verification',
                label: '검증 결과',
                title: '동시 요청 결과를 기준으로 잔액 초과 주문 차단과 충전 누락 방지를 확인했습니다.',
                text: '검증은 로컬 단일 Spring Boot 인스턴스와 로컬 MySQL, Redis 환경에서 수행했습니다.',
                supportCards: [
                  {
                    title: '동일 사용자 주문 100건을 동시에 요청해 잔액 초과 주문이 차단되는지 확인했습니다.',
                    target: '검증 대상 · 사용자별 Redis 분산락 + DB 비관락이 적용된 주문 전체 경로',
                    text: '동일 사용자의 주문 100건을 동시에 요청했고, 보유 잔액으로 결제 가능한 3건만 성공했습니다. 나머지 97건은 잔액 부족으로 거절됐고 최종 포인트는 0P로 일치했습니다.',
                    image: {
                      src: '/k-server-images/distributed-lock-order-result.png',
                      alt: 'k6 동일 사용자 주문 동시성 검증 결과',
                      crop: 'order-verification-result',
                    },
                    items: [
                      { label: '초기 잔액', value: '9,000P' },
                      { label: '동시 주문', value: '100건' },
                      { label: '성공', value: '3건' },
                      { label: '잔액 부족', value: '97건' },
                      { label: '최종 잔액', value: '0P' },
                      { label: '주문 단가', value: '3,000P' },
                    ],
                  },
                  {
                    title: '동일 계정 충전 50건을 동시에 요청해 누락 없이 반영되는지 확인했습니다.',
                    target: '검증 대상 · DB 비관락이 적용된 포인트 충전 경로',
                    text: '같은 계정에 1,000P 충전 요청 50건을 동시에 보냈고, 시작 잔액 대비 +50,000P가 모두 반영되어 충전 요청 누락이 없음을 확인했습니다.',
                    image: {
                      src: '/k-server-images/pessimistic-lock-charge-result.png',
                      alt: 'k6 동일 계정 포인트 충전 비관락 검증 결과',
                      crop: 'charge-verification-result',
                    },
                    items: [
                      { label: '동시 충전', value: '50건' },
                      { label: '건당 충전', value: '1,000P' },
                      { label: '기대 증가액', value: '+50,000P' },
                      { label: '실제 증가액', value: '+50,000P' },
                      { label: '누락', value: '0건' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        number: '04',
        id: 'kafka-boundary',
        title: 'DB 커밋 이후 Kafka 이벤트 발행 시점 분리',
        navTitle: 'Kafka 후속 처리',
        navSubtitle: 'DB 커밋 이후 이벤트 발행',
        lead: 'DB 커밋 이후 Kafka 발행이 시작되도록\n처리 시점을 분리했습니다.',
        content: [
          {
            type: 'tabs',
            tabs: [
              {
                id: 'publish-after-commit',
                label: '발행 시점',
                title: 'DB 커밋 이후 Kafka Producer가 호출되도록 발행 시점을 분리했습니다.',
                text: '주문 서비스에서는 포인트 차감, 포인트 거래 이력 저장, 주문 저장 같은 DB 처리를 먼저 수행합니다.\n그 과정에서 Kafka 메시지 자체가 아니라 Spring 애플리케이션 내부 이벤트인 OrderCreatedEvent를 발행하고,\n트랜잭션 커밋이 성공한 이후 Kafka Producer 호출로 이어지도록 연결했습니다.',
                diagrams: [
                  {
                    type: 'sequence',
                    label: '발행 흐름',
                    density: 'compact',
                    connectorTone: 'subtle',
                    layout: 'deck',
                    steps: [
                      { title: '주문 / 포인트 DB 처리' },
                      { title: 'OrderCreatedEvent 발행', text: 'JVM 내부 애플리케이션 이벤트' },
                      { title: 'DB COMMIT' },
                      { title: '@TransactionalEventListener', text: 'AFTER_COMMIT' },
                      { title: 'Kafka Producer' },
                    ],
                  },
                ],
                cards: {
                  label: '발행 시점 분리에 사용한 역할',
                  columns: 2,
                  items: [
                    { label: '@TransactionalEventListener', text: '트랜잭션 상태에 따라 이벤트 처리 시점을 지정했습니다.' },
                    { label: 'AFTER_COMMIT', text: 'DB 커밋이 완료된 이후 Kafka 발행 로직이 실행되도록 사용했습니다.', tone: 'primary' },
                  ],
                },
              },
              {
                id: 'consumer-flow',
                label: 'Consumer 처리 순서',
                title: 'Consumer는 주문 상태를 DB에 반영한 뒤 Redis 인기 메뉴 집계를 이어서 처리합니다.',
                diagrams: [
                  {
                    type: 'sequence',
                    label: 'Consumer 처리 순서',
                    density: 'compact',
                    connectorTone: 'subtle',
                    layout: 'deck',
                    steps: [
                      { title: 'Kafka 주문 이벤트 수신' },
                      { title: '주문 조회' },
                      { title: 'DB 주문 상태 변경', text: 'CREATED에서 COMPLETED로 변경' },
                      { title: 'DB 처리 완료' },
                      { title: 'Redis 인기 메뉴 점수 반영' },
                    ],
                  },
                ],
                cards: {
                  label: 'DB 처리와 Redis 후속 처리',
                  columns: 2,
                  items: [
                    { label: '주문 상태 반영', text: 'Order 조회 → CREATED에서 COMPLETED로 변경 → DB 처리 완료' },
                    { label: 'Redis 인기 메뉴 집계', text: 'DB 주문 상태 반영 이후 Redis 인기 메뉴 점수를 업데이트', tone: 'primary' },
                  ],
                },
                callout: '주문 상태 변경을 DB에 먼저 반영한 뒤 Redis 인기 메뉴 집계를 이어서 호출해, Consumer 내부의 핵심 DB 처리와 후속 집계 순서를 분리했습니다.',
                calloutTone: 'soft',
              },
              {
                id: 'failure-verification',
                label: '실패 대응 및 검증',
                title: 'Consumer 실패 대응을 구성하고, 정상 이벤트 처리 결과를 검증했습니다.',
                text: 'Consumer 처리 실패에는 1초 간격으로 2회 재시도한 뒤 DLT로 전달하는 설정을 두고,\n정상 시나리오는 주문 이벤트 처리 결과와 Redis 인기 메뉴 점수 반영 결과로 확인했습니다.',
                diagrams: [
                  {
                    type: 'sequence',
                    label: '실패 대응',
                    density: 'compact',
                    connectorTone: 'subtle',
                    layout: 'deck',
                    steps: [
                      { title: 'Consumer 처리 실패' },
                      { title: '1초 후 1차 재시도' },
                      { title: '1초 후 2차 재시도' },
                      { title: '반복 실패 시 DLT 전달', tone: 'primary' },
                    ],
                  },
                ],
                callout: 'Retry와 DLT는 Kafka Consumer 처리 실패에 대한 설정으로 정리했습니다.',
                calloutTone: 'soft',
                metrics: [
                  { label: '주문 이벤트', value: '60건' },
                  { label: '인기 메뉴 점수 증가', value: '+60', tone: 'primary' },
                  { label: '정상 시나리오 처리 실패', value: '0건' },
                ],
                supportCards: [
                  {
                    title: 'k6 정상 주문 이벤트 60건 검증',
                    text: '정상 주문 이벤트 60건을 실행한 뒤 Consumer 처리 결과와 Kafka 지표를 확인했습니다.',
                    image: { src: '/k-server-images/kafka-integrity-result.png', alt: 'k6 Kafka 정상 주문 이벤트 처리 검증 결과', crop: 'kafka-integrity-result' },
                    items: [
                      { label: '주문 이벤트', value: '60건' },
                      { label: '정상 시나리오 처리 실패', value: '0건' },
                    ],
                  },
                  {
                    title: 'Redis 인기 메뉴 점수 확인',
                    text: 'Consumer 처리 결과가 Redis Sorted Set 점수로 반영된 것을 확인했습니다.',
                    image: { src: '/k-server-images/redisinsight-menu-result.png', alt: 'Redis Sorted Set 인기 메뉴 점수 확인 화면' },
                    items: [
                      { label: '저장 방식', value: 'Redis Sorted Set' },
                      { label: '점수 증가', value: '+60' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    {
      number: '05',
      id: 'additional-design',
      title: 'Redis 조회 설계',
      navTitle: 'Redis 조회 설계',
      navSubtitle: '메뉴 캐시와 인기 메뉴',
      lead: '조회 특성에 따라\nRedis 캐시와 인기 메뉴 집계를 나누어 설계했습니다.',
      content: [
        {
          type: 'tabs',
          tabs: [
            {
              id: 'menu-cache',
              label: '메뉴 캐시',
              title: '반복되는 메뉴 조회의 DB 접근을 줄이기 위해 Redis 캐시를 적용했습니다.',
              text: '메뉴 목록과 상세 조회 결과를 Redis에 저장하고, 캐시가 없는 경우 DB에서 다시 조회하도록 구성했습니다.\n\n현재 구현에서는 StringRedisTemplate와 ObjectMapper를 사용해 Redis 캐시 데이터를 저장하고 조회했습니다.',
              cards: {
                label: '메뉴 조회 캐시 구성',
                columns: 3,
                items: [
                  { label: '캐시 대상', text: '메뉴 목록은 menus:all 키에 저장하고,\n메뉴 상세 정보는 menu:{id} 키에 저장합니다.' },
                  { label: '유지 시간', text: '두 캐시 모두 TTL을 30분으로 두어 일정 시간이 지나면 다시 DB에서 조회하도록 했습니다.', tone: 'primary' },
                  { label: '변경 시 처리', text: '메뉴 등록, 수정, 삭제가 발생하면 오래된 메뉴 정보가 반환되지 않도록 관련 캐시를 즉시 제거합니다.' },
                ],
              },
              subsection: {
                title: 'StringRedisTemplate 구현 방식',
                paragraphs: [],
                callout: 'StringRedisTemplate로 문자열 값을 저장하고, ObjectMapper를 사용해 응답 DTO와 JSON 문자열 사이의 변환을 처리했습니다.',
              },
              callout: '삭제 시 DB와 캐시 처리\nDB에서는 Soft Delete 정책을 사용했습니다. 메뉴 삭제 시 @SQLDelete로 is_deleted 값을 변경하고,\n@SQLRestriction에 따라 일반 조회에서는 삭제된 메뉴가 제외됩니다. 이때 Redis의 메뉴 목록 캐시와 해당 메뉴 상세 캐시도 함께 제거합니다.',
              calloutTone: 'soft',
              supportCards: [
                {
                  title: 'Redis 메뉴 캐시 확인',
                  text: '메뉴 목록 캐시가 menus:all 키로 Redis에 저장된 화면입니다.',
                  image: { src: '/k-server-images/redisinsight-menu-all.png', alt: 'Redis 메뉴 목록 캐시 확인 화면' },
                  items: [
                    { label: '목록 키', value: 'menus:all' },
                    { label: 'TTL', value: '30분' },
                  ],
                },
              ],
            },
            {
              id: 'popular-menu-aggregation',
              label: '인기 메뉴 집계',
              title: '최근 사용자 행동을 Redis Sorted Set에 누적해 인기 메뉴를 집계했습니다.',
              text: '현재 인기 메뉴 점수에는 주문 행동과 로그인 사용자의 메뉴 검색 행동을 함께 반영했습니다.\n날짜별 Redis Sorted Set에 점수를 누적하고, 최근 7일 범위의 점수를 합산해 TOP 3를 조회하도록 구성했습니다.',
              diagrams: [
                {
                  type: 'sequence',
                  label: '인기 메뉴 집계 흐름',
                  density: 'compact',
                  connectorTone: 'subtle',
                  layout: 'deck',
                  steps: [
                    { title: '사용자 행동', text: '주문 / 로그인 사용자의 메뉴 검색' },
                    { title: '일별 집계', text: 'popular:menus:{yyyy-MM-dd}\n날짜별 Redis Sorted Set에 점수 누적' },
                    { title: '최근 데이터 결합', text: '최근 7일 키를 unionAndStore로 합산' },
                    { title: '조회 결과', text: '인기 점수 기준 TOP 3 조회 후 결과 캐시', tone: 'primary' },
                  ],
                },
              ],
              metrics: [
                { label: '일별 데이터 TTL', value: '8일' },
                { label: '결과 캐시 TTL', value: '1시간', tone: 'primary' },
                { label: '검색 중복 방지', value: '5분' },
              ],
              callout: '검색 점수는 user + menu 기준 dedup key를 5분 동안 유지해,\n같은 사용자의 동일 메뉴 검색이 짧은 시간에 반복 반영되는 것을 줄였습니다.',
              calloutTone: 'soft',
              supportCards: [
                {
                  title: 'Redis 인기 메뉴 점수 확인',
                  text: '날짜별 Sorted Set과 최근 범위를 합산한 결과 키를 RedisInsight에서 확인한 화면입니다.',
                  image: { src: '/k-server-images/redisinsight-menu-result.png', alt: 'Redis Sorted Set 인기 메뉴 점수 확인 화면' },
                  items: [
                    { label: '집계 방식', value: 'Redis Sorted Set' },
                    { label: '집계 범위', value: '최근 7일' },
                    { label: '조회 결과', value: 'TOP 3' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      number: '06',
      id: 'limits',
      title: '검증 범위와 남은 한계',
      navTitle: '검증 범위와 보완',
      navSubtitle: '실제 검증과 추가 확인 사항',
      lead: '검증한 범위와 추가로 확인할 사항을 정리했습니다.',
      content: [
        {
          type: 'tabs',
          tabs: [
            {
              id: 'actual-verification',
              label: '실제 검증',
              title: '로컬 단일 인스턴스 환경에서 세 가지 시나리오를 검증했습니다.',
              cards: {
                columns: 3,
                items: [
                  {
                    label: '동일 사용자 주문 100건',
                    text: '성공 3건\n잔액 부족 97건\n최종 잔액 0P\n\n동일 사용자의 주문 요청이 동시에 들어왔을 때 실제 보유 포인트를 초과한 주문이 승인되지 않는지 확인했습니다.',
                  },
                  {
                    label: '동일 계정 충전 50건',
                    text: '1,000P × 50건\n기대 증가 +50,000P\n실제 증가 +50,000P\n누락 0건\n\n동일 사용자의 포인트를 여러 요청이 변경하는 상황에서 최종 잔액에 갱신 누락이 없는지 확인했습니다.',
                  },
                  {
                    label: 'Kafka 정상 주문 이벤트 60건',
                    text: '주문 이벤트 60건\nRedis 인기 점수 +60\n정상 시나리오 DLT 0건\n\n정상 주문 이벤트가 Consumer 처리와 Redis 인기 점수 반영까지 이어지는 흐름을 확인했습니다.',
                  },
                ],
              },
              supplementalCards: {
                label: '검증 환경과 확인 범위',
                columns: 2,
                items: [
                  { label: '검증 환경', text: '로컬 단일 Spring Boot 인스턴스와 MySQL, Redis, Kafka 환경에서 검증했습니다. RedisInsight와 Kafka UI를 함께 사용해 Redis의 캐시 키와 Sorted Set 점수,\nKafka Topic 메시지와 Consumer 처리 상태 등 실제 데이터가 저장되고 전달되는 과정도 확인했습니다.' },
                  { label: '확인 방식', text: '주문과 충전은 최종 잔액과 누락 여부를 기준으로 확인했습니다.\nRedis와 Kafka는 애플리케이션 결과만 확인하는 데 그치지 않고, RedisInsight와 Kafka UI에서 실제 데이터 저장과 메시지 전달 상태를 함께 확인했습니다.' },
                ],
              },
              callout: '이번 검증은 처리량 자체를 평가하기보다, Redis와 Kafka를 적용한 기능이 의도한 데이터 흐름으로 동작하는지 직접 확인하는 데 초점을 두었습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'followup-improvements',
              label: '추가 검증과 보완',
              title: '필요한 보장 수준에 따라 추가 검증과 보완을 검토할 수 있습니다.',
              cards: {
                columns: 3,
                layout: 'rows',
                items: [
                  {
                    label: '다중 인스턴스 환경 검증',
                    text: '설계에서는 여러 애플리케이션 인스턴스가 동일 Redis를 공유하는 상황을 고려해 사용자별 분산락을 적용했습니다.\n\n이후 실제 운영 형태에 가까운 검증이 필요하다면, 여러 Spring Boot 인스턴스를 구성해\nlock:order:{userId}가 인스턴스 사이에서도 동일하게 적용되는지 추가로 점검해볼 수 있습니다.\n\n현재 분산락은 tryLock(3s, 5s)의 명시적 lease time을 사용하고 있으므로,\n주문 처리 시간이 5초를 넘는 상황에서의 락 동작도 추가 검증 항목으로 둘 수 있습니다.',
                  },
                  {
                    label: 'Kafka 발행 실패 대응',
                    text: 'AFTER_COMMIT을 사용해 DB 커밋 이후 Kafka Producer가 호출되도록 발행 시점을 분리했습니다.\n\nDB 커밋 이후 Kafka Producer 발행 실패 상황은 별도 시나리오로 구성해, 실패 기록과 재처리 흐름을 추가로 점검해볼 수 있습니다.\n\n메시지 전달 보장을 더 강화해야 하는 상황에서는 Outbox Pattern도 보완 방향 중 하나로 검토해볼 수 있습니다.',
                    tone: 'primary',
                  },
                  {
                    label: '실패 및 중복 이벤트 처리',
                    text: 'Consumer 실패 상황을 의도적으로 구성해 재시도부터 DLT 이동까지의 흐름을 직접 확인해보는 테스트도 추가할 수 있습니다.\n\n동일 이벤트가 다시 전달되는 상황에서는 주문 상태 변경과 Redis 인기 점수 반영이\n어떻게 처리되는지도 추가 검증 대상으로 삼을 수 있습니다.\n\n요구되는 멱등성 수준에 따라 이벤트 ID나 별도 처리 이력을 활용하는 방식도 중복 처리 방지를 위한 선택지로 검토해볼 수 있습니다.',
                  },
                ],
              },
              callout: '현재 검증 범위를 기준으로, 서비스 규모와 필요한 보장 수준에 따라 추가로 확인하거나 보완할 수 있는 항목을 정리했습니다.',
              calloutTone: 'soft',
            },
          ],
        },
      ],
    },
  ],
};
