export interface CaseStudyFact {
  label: string;
  value: string;
}

export interface CaseStudyBlock {
  label: string;
  text: string;
  tone?: 'primary' | 'dark';
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  note?: string;
  tone?: 'primary' | 'dark';
}

export interface CaseStudyEvidence {
  label: string;
  caption?: string;
}

export interface CaseStudyHierarchyItem {
  label: string;
  value: string;
  tone?: 'complete' | 'pending';
}

export interface CaseStudyTab {
  id: string;
  label: string;
  title: string;
  text?: string;
  featureItems?: CaseStudyBlock[];
  evidence?: CaseStudyEvidence;
  flow?: string[];
  cards?: {
    label?: string;
    columns?: 2 | 3 | 4;
    items: CaseStudyBlock[];
  };
  hierarchy?: {
    parent: string;
    items: CaseStudyHierarchyItem[];
    footer: string;
  };
  callout?: string;
  calloutTone?: 'soft' | 'dark';
  comparison?: {
    columns: string[];
    rows: {
      label: string;
      values: string[];
    }[];
    highlightColumn?: number;
  };
  accordions?: {
    title: string;
    text?: string;
    cards?: CaseStudyBlock[];
    facts?: CaseStudyFact[];
  }[];
  supportCards?: {
    title: string;
    text?: string;
    items: CaseStudyFact[];
  }[];
}

export type CaseStudyContentBlock =
  | {
      type: 'hero';
      label: string;
      paragraphs: string[];
      scope: string[];
    }
  | {
      type: 'prose';
      paragraphs: string[];
    }
  | {
      type: 'facts';
      items: CaseStudyFact[];
    }
  | {
      type: 'scope';
      label: string;
      text: string;
    }
  | {
      type: 'flow';
      items: string[];
    }
  | {
      type: 'flowGroups';
      groups: {
        label: string;
        title: string;
        items: string[];
      }[];
    }
  | {
      type: 'approach';
      steps: string[];
      items: CaseStudyBlock[];
    }
  | {
      type: 'comparison';
      columns: string[];
      rows: {
        label: string;
        values: string[];
      }[];
      highlightColumn?: number;
    }
  | {
      type: 'accordion';
      items: {
        title: string;
        text?: string;
        cards?: CaseStudyBlock[];
        facts?: CaseStudyFact[];
      }[];
    }
  | {
      type: 'decision';
      from: {
        label: string;
        text: string;
      };
      to: {
        label: string;
        text: string;
      };
    }
  | {
      type: 'states';
      items: CaseStudyFact[];
    }
  | {
      type: 'cards';
      label?: string;
      columns?: 2 | 3 | 4 | 5;
      items: CaseStudyBlock[];
    }
  | {
      type: 'metrics';
      label?: string;
      items: CaseStudyMetric[];
    }
  | {
      type: 'subsection';
      label?: string;
      title: string;
      text?: string;
    }
  | {
      type: 'feature';
      label?: string;
      title: string;
      items: CaseStudyBlock[];
      evidence: CaseStudyEvidence;
    }
  | {
      type: 'evidence';
      label?: string;
      items: CaseStudyEvidence[];
    }
  | {
      type: 'hierarchy';
      label?: string;
      parent: string;
      items: CaseStudyHierarchyItem[];
      footer: string;
    }
  | {
      type: 'tabs';
      tabs: CaseStudyTab[];
    }
  | {
      type: 'callout';
      label?: string;
      text: string;
    }
  | {
      type: 'video';
      src?: string;
      poster?: string;
      mimeType?: string;
      title: string;
      description: string;
    };

export interface CaseStudySection {
  number: string;
  id: string;
  title: string;
  navTitle: string;
  navSubtitle?: string;
  lead: string;
  accent?: string | string[];
  content?: CaseStudyContentBlock[];
  facts?: CaseStudyFact[];
  bullets?: string[];
  flow?: string[];
  states?: CaseStudyFact[];
  blocks?: CaseStudyBlock[];
  metrics?: CaseStudyMetric[];
}

export interface CaseStudyContent {
  projectLabel: string;
  description?: string;
  sections: CaseStudySection[];
}

export const caseStudies: Record<string, CaseStudyContent> = {
  hankkipot: {
    projectLabel: '한끼팟',
    description:
      '낯선 React 구조와 Kakao Maps SDK를 학습해 SVG 프로토타입을 실제 GPS·QR 만남 인증 흐름으로 전환하고, 그룹 매칭의 완료 단위를 개선한 케이스 스터디입니다.',
    sections: [
      {
        number: '01',
        id: 'overview',
        title: 'Overview',
        navTitle: '개요',
        navSubtitle: '프로젝트 한눈에 보기',
        lead: '장소 인증과 QR 만남 인증을 서비스 완료 흐름으로 연결했습니다.',
        content: [
          {
            type: 'hero',
            label: 'OFFLINE TRUST SYSTEM',
            paragraphs: [
              '한끼팟에서 제가 맡은 핵심은 장소 인증과 만남 인증이었습니다.',
              'Kakao Maps와 Geolocation API로 약속 장소와 현재 위치를 화면에 표시하되, 최종 인증 성공 여부는 서버에서 다시 판단하도록 연결했습니다.',
              'QR 인증 이후에는 신청자별 Match 완료, 위치 데이터 삭제, 책임비 반환까지 이어지게 구성해 사용자 화면의 인증 결과가 백엔드 상태 변경과 후속 처리로 자연스럽게 이어지도록 구현했습니다.',
            ],
            scope: ['Kakao Maps GPS 인증', 'QR 만남 인증', '서버 거리 검증', 'Match 완료 흐름'],
          },
        ],
      },
      {
        number: '02',
        id: 'problem',
        title: 'Problem',
        navTitle: '문제 정의',
        navSubtitle: '핵심 문제와 배경',
        lead: 'SVG 위치 화면과 1:1 QR 구조는 실제 장소 인증과 그룹 매칭에 부족했습니다.',
        content: [
          {
            type: 'prose',
            paragraphs: [
              '초기 MVP는 1:1 매칭을 빠르게 검증하는 데에는 충분했지만,\n고도화 단계에서 그룹 매칭과 실제 장소 인증 흐름까지 확장되면서\n기존 구조의 한계가 드러났습니다.',
              'SVG 기반 위치 화면은 사용자가 만남 장소를 검색해 지정하고,\n선택한 좌표를 인증 화면과 서버 검증에 연결하는 흐름을 담기 어려웠습니다.',
              '또한 1:1 기준 QR 완료 구조는 한 신청자의 인증 결과가\n전체 Post 완료로 이어지는 문제를 만들었습니다.',
            ],
          },
          {
            type: 'cards',
            columns: 2,
            items: [
              {
                label: '만남 장소를 검색해 지정하기 어려움',
                text: 'SVG 원형 지도는 실제 지도 SDK가 아니기 때문에, 사용자가 식당이나 건물을 검색해 만남 장소로 선택하고 좌표를 저장하는 흐름을 만들기 어려웠습니다.',
              },
              {
                label: '실제 위치를 찾기 어려움',
                text: 'SVG 화면은 고정 좌표를 보여주는 수준이어서, 사용자가 자신이 실제로 어디에 있는지와 어느 방향으로 이동해야 하는지 파악하기 어려웠습니다.',
                tone: 'primary',
              },
              {
                label: '서버 검증 기준으로 연결되기 어려움',
                text: 'SVG 픽셀 좌표는 실제 미터 거리와 일치하지 않아, 장소 인증 성공 여부를 서버 기준 거리 검증으로 판단하기에 적합하지 않았습니다.',
              },
              {
                label: '1:1 QR 완료 구조가 그룹 매칭에서 깨짐',
                text: '초기 1:1 기준 구조에서는 첫 신청자의 QR 인증 결과가 전체 Post 완료로 이어질 수 있어, 그룹 매칭에서는 신청자별 Match 완료와 전체 완료를 분리할 필요가 있었습니다.',
              },
            ],
          },
        ],
      },
      {
        number: '03',
        id: 'service-flow',
        title: 'Service Flow',
        navTitle: '접근 방식',
        navSubtitle: '해결 방향과 전략',
        lead: '장소 검색, GPS 인증, QR 완료가 하나의 만남 흐름으로 이어지게 했습니다.',
        content: [
          {
            type: 'approach',
            steps: ['장소 검색', '지도 표시', 'GPS 인증', 'QR 인증', 'Match 완료', 'Post 완료'],
            items: [
              {
                label: '장소 좌표를 인증 기준으로 연결',
                text: '게시글 작성 시 검색한 장소의 placeName, placeLat, placeLng를 저장하고,\n인증 화면과 서버 거리 검증에서 동일한 좌표를 기준으로 사용했습니다.',
              },
              {
                label: '화면은 위치를 보여주고, 서버가 인증을 판단',
                text: 'Kakao Maps와 Geolocation API는 약속 장소와 현재 위치를 보여주는 역할로 두고,\n최종 인증 성공 여부는 서버에서 다시 판단하도록 분리했습니다.',
                tone: 'primary',
              },
              {
                label: 'QR 이후 완료 단위를 신청자별로 분리',
                text: 'QR 인증 결과는 신청자별 Match 완료로 처리했습니다.\n한 신청자의 인증이 다른 신청자의 흐름에 영향을 주지 않도록 분리하고,\n모든 완료 대상 Match가 끝났을 때만 Post를 완료했습니다.',
              },
            ],
          },
          {
            type: 'callout',
            label: '접근 전략',
            text: '장소 좌표는 저장부터 인증까지 동일한 기준으로 연결했습니다.\n게시글에서 저장한 좌표를 GPS 인증 화면과 서버 거리 검증에서 함께 사용하고, GPS 인증이 성공한 경우에만 QR 인증 단계로 이어지도록 구성했습니다.\n\nQR 결과는 신청자별 Match 완료로 처리하고, 전체 Post 완료 기준과 분리해 그룹 매칭에서도 인증 흐름이 끊기지 않도록 했습니다.',
          },
        ],
      },
      {
        number: '04',
        id: 'gps-verification',
        title: 'GPS Verification',
        navTitle: '핵심 의사결정',
        navSubtitle: '주요 결정과 근거',
        lead: 'SVG 프로토타입을\nKakao Maps 기반 GPS 인증으로 전환했습니다.',
        content: [
          {
            type: 'tabs',
            tabs: [
              {
                id: 'sdk-transition',
                label: '지도 SDK 전환 판단',
                title: '왜 지도 SDK로 전환했는가',
                text: 'MVP 단계에서는 SVG 원형 지도로 인증 흐름을 빠르게 검증했습니다.\n하지만 고도화 단계에서는 사용자가 장소를 검색해 좌표로 저장하고,\n그 좌표를 인증 화면과 서버 거리 검증에서 동일하게 사용하는 구조가 필요했습니다.\n\n따라서 단순 위치 표시용 SVG가 아니라,\n장소 검색 → 좌표 저장 → 지도 표시 → 서버 검증으로 이어지는\n지도 SDK 기반 구조로 전환했습니다.',
                cards: {
                  columns: 3,
                  items: [
                    {
                      label: '유지한 것',
                      text: 'Geolocation API와 서버 거리 검증 흐름은 유지했습니다.\n현재 위치를 가져오고, 최종 인증 성공 여부는 서버에서 다시 판단하는 구조는 계속 사용했습니다.',
                    },
                    {
                      label: '교체한 것',
                      text: 'SVG 원형 지도는 Kakao Maps 기반 지도 화면으로 교체했습니다.\n사용자가 실제 장소와 이동 방향을 이해하고, 약속 장소를 지도 위에서 확인할 수 있게 했습니다.',
                    },
                    {
                      label: '연결한 것',
                      text: '게시글 등록 시 저장한 placeName, placeLat, placeLng를 인증 화면 표시와 서버 거리 검증에서 동일한 기준으로 사용하도록 연결했습니다.',
                    },
                  ],
                },
                callout: '핵심은 지도 화면을 예쁘게 바꾸는 것이 아니라,\n장소 선택부터 서버 검증까지 같은 좌표 흐름으로 이어지게 만드는 것이었습니다.',
                calloutTone: 'soft',
              },
              {
                id: 'kakao-choice',
                label: 'Kakao Maps 선택 이유',
                title: '왜 Kakao Maps를 선택했는가',
                text: '지도 SDK는 국내 지도 품질, 무료 사용 범위, 장소 검색, 공식 문서, 보안 방식을 기준으로 비교했습니다.\n\nKakao Maps는 장소 검색과 지도 표시를 하나의 SDK 안에서 처리할 수 있어,\n게시글 등록부터 GPS 인증 화면까지 같은 좌표 흐름으로 연결하기에 적합했습니다.',
                comparison: {
                  columns: ['Kakao Maps', 'Naver Maps', 'Google Maps'],
                  highlightColumn: 0,
                  rows: [
                    { label: '국내 지도', values: ['높음', '높음', '보통'] },
                    { label: '무료 사용 범위', values: ['일 30만 건', '월 600만 건', '월 1만 건'] },
                    { label: '장소 검색', values: ['제공', '제공', '별도 SKU'] },
                    { label: '공식 문서', values: ['한국어 풍부', '한국어 풍부', '영문 중심'] },
                    { label: '보안 방식', values: ['도메인 등록', '클라이언트 ID', 'API 키 제한'] },
                  ],
                },
                callout: '장소 검색과 지도 표시를 같은 SDK에서 처리할 수 있었기 때문에,\n게시글 등록 → 좌표 저장 → GPS 인증 화면 연결까지 하나의 흐름으로 구성할 수 있었습니다.',
                calloutTone: 'soft',
              },
            ],
          },
        ],
      },
      {
        number: '05',
        id: 'qr-completion',
        title: 'QR Completion',
        navTitle: '구현 포인트',
        navSubtitle: '기능 설계와 구현',
        lead: 'QR 토큰은 Post 단위로 공유하고,\n완료 상태는 Match 단위로 분리했습니다.',
        accent: ['Post 단위', 'Match 단위'],
        content: [
          {
            type: 'prose',
            paragraphs: [
              'GPS 인증 이후 실제 대면 여부를 확인하기 위해 QR 인증 단계를 연결했습니다.',
              'QR 토큰은 하나의 만남을 나타내는 Post 단위로 공유하고,\n인증 완료 상태와 정산 흐름은 신청자별 Match 단위로 처리했습니다.',
            ],
          },
          {
            type: 'tabs',
            tabs: [
              {
                id: 'verification',
                label: 'QR 토큰 구현',
                title: '등록자는 QR을 표시하고, 신청자는 스캔하도록 역할을 분리했습니다.',
                text: 'QR 인증은 GPS 이후 실제 대면 여부를 확인하는 마지막 인증 단계입니다.\n등록자는 Post 기준 QR을 조회하고, 신청자는 자신의 matchId로 QR을 스캔하도록 구성했습니다.',
                cards: {
                  columns: 3,
                  items: [
                    {
                      label: '역할 분리',
                      text: '등록자만 QR을 표시하고 신청자만 스캔하도록 역할을 나눴습니다.\n한쪽의 버튼 클릭만으로 만남 완료가 처리되지 않도록 했습니다.',
                    },
                    {
                      label: '토큰 저장',
                      text: 'hp_qr_ 접두사와 UUID 기반 문자열을 생성해\nmeet_verifications.qr_token 컬럼에 저장했습니다.\nJWT나 Redis 토큰이 아니라 DB에 저장되는 만남 인증용 토큰입니다.',
                    },
                    {
                      label: '만료 기준',
                      text: 'QR 토큰은 코드 기준 10분 동안 유효하도록 처리했습니다.\n트랜잭션 안에서 엔티티를 수정하고 JPA 변경 감지로 반영했습니다.',
                    },
                  ],
                },
                callout: 'QR은 단순 화면 기능이 아니라, GPS 이후 실제 대면 여부를 확인하는 인증 단계로 연결했습니다.',
                calloutTone: 'soft',
              },
              {
                id: 'unit-separation',
                label: 'Match/Post 완료 분리',
                title: '신청자별 완료와 전체 만남 완료 기준을 분리했습니다.',
                text: '하나의 Post에는 여러 Match가 존재할 수 있으므로, QR 토큰 공유 단위와 완료 처리 단위를 다르게 가져갔습니다.\n토큰은 Post 단위로 공유하고, 인증 완료와 책임비 처리는 신청자별 Match 단위로 처리했습니다.',
                cards: {
                  columns: 3,
                  items: [
                    {
                      label: 'Post 단위 QR',
                      text: '같은 게시글에 속한 참여자들이 하나의 QR 토큰을 공유하도록 Post 기준 QR 조회 API를 사용했습니다.\n등록자는 공통 QR을 표시합니다.',
                    },
                    {
                      label: 'Match 단위 완료',
                      text: 'QR을 스캔한 신청자의 MeetVerification과 Match만 완료 처리했습니다.\n한 신청자의 인증이 다른 신청자의 상태를 바꾸지 않도록 분리했습니다.',
                    },
                    {
                      label: '전체 완료 조건',
                      text: '모든 완료 대상 Match가 끝났을 때만 Post를 COMPLETE 처리했습니다.\n노쇼 대상 Match는 전체 완료 대기 대상에서 제외했습니다.',
                    },
                  ],
                },
                callout: '공유 단위는 Post, 완료 단위는 Match로 분리해 그룹 매칭에서도 인증 흐름이 끊기지 않도록 했습니다.',
                calloutTone: 'soft',
              },
              {
                id: 'completion-flow',
                label: '완료 처리 흐름',
                title: 'QR 성공 이후 상태 변경과 완료 처리 흐름을 연결했습니다.',
                flow: [
                  'QR 스캔',
                  'Verification DONE',
                  '위치 데이터 삭제',
                  'Match 완료',
                  '신청자 책임비 반환',
                  '완료 대상 Match 확인',
                  'Post 완료',
                  '등록자 책임비 반환',
                ],
                cards: {
                  columns: 3,
                  items: [
                    {
                      label: 'DB 트랜잭션',
                      text: '인증 상태 변경, Match 완료, 위치 데이터 삭제, 신청자 책임비 반환을 같은 처리 흐름 안에서 관리했습니다.',
                    },
                    {
                      label: '책임비 반환',
                      text: 'QR 성공 이후 신청자 책임비 반환까지 같은 완료 처리 흐름으로 이어지도록 구성했습니다.',
                    },
                    {
                      label: '멱등 처리',
                      text: '이미 완료된 Match나 Post가 중복 처리되지 않도록 완료 기준을 분리하고 상태를 확인했습니다.',
                    },
                  ],
                },
                callout: 'QR 인증 성공이 화면에서 끝나지 않고,\nMatch 완료와 위치 데이터 삭제, 책임비 반환까지 이어지도록 구현했습니다.',
                calloutTone: 'soft',
              },
            ],
          },
        ],
      },
      {
        number: '06',
        id: 'demo',
        title: 'Demo',
        navTitle: '시연 영상',
        navSubtitle: '동작 흐름 확인',
        lead: '서비스의 주요 흐름을 확인할 수 있습니다.',
        content: [
          {
            type: 'prose',
            paragraphs: [
              '아래 영상에서는 한끼팟의 주요 기능과 실제 화면 전환을 확인할 수 있습니다.',
              '게시글 작성, 매칭, 채팅, 장소 인증, QR 인증, 만남 완료 화면이 서비스 안에서 어떻게 동작하는지 보여줍니다.',
            ],
          },
          {
            type: 'video',
            src: '/hankkipot-demo.mp4',
            poster: '/hankkipot-verification-hero.png',
            mimeType: 'video/mp4',
            title: '한끼팟 주요 사용 흐름 시연',
            description: '게시글 작성과 매칭부터 채팅, 만남 인증과 완료까지 이어지는 흐름입니다.',
          },
        ],
      },
    ],
  },
  'k-server': {
    projectLabel: 'K-server',
    description:
      '다중 인스턴스 환경을 가정하고 Redis 분산락, DB 비관락과 Kafka를 조합해 포인트 정합성과 주문 이벤트 흐름을 검증한 개인 백엔드 프로젝트입니다.',
    sections: [
      {
        number: '01',
        id: 'overview',
        title: 'Overview',
        navTitle: 'Overview',
        lead:
          '다중 인스턴스 환경을 가정하고, 포인트 정합성과 주문 이벤트 흐름을 검증한 커피 주문 시스템입니다.',
        content: [
          {
            type: 'callout',
            text: '다중 인스턴스 환경을 가정하고, 주문과 포인트 정합성을 검증한 커피 주문 시스템입니다.',
          },
          {
            type: 'prose',
            paragraphs: [
              'K-server는 앱 기반 커피숍 주문 플랫폼을 주제로 한 개인 백엔드 프로젝트입니다. 사용자는 메뉴를 조회하고 포인트를 충전한 뒤, 포인트로 커피를 주문하거나 취소할 수 있습니다. 주문 내역을 기반으로 최근 7일간 인기 메뉴 TOP 3도 조회할 수 있습니다.',
              '가장 중요하게 본 부분은 단순 CRUD가 아니라 동시 주문에서 포인트 잔액이 어긋나지 않는지, DB 롤백 주문이 Kafka 후속 처리로 넘어가지 않는지, Redis 인기 메뉴 집계가 실제 주문 흐름과 일관되게 동작하는지였습니다.',
              '개인 프로젝트였기 때문에 요구사항 해석부터 설계, 구현과 테스트까지 직접 진행했습니다.',
            ],
          },
          {
            type: 'facts',
            items: [
              { label: 'ROLE', value: 'Solo Backend' },
              { label: 'TYPE', value: 'Personal Project' },
              { label: 'PERIOD', value: '2026.04 - 2026.05' },
              {
                label: 'FOCUS',
                value: 'Concurrency · Point Consistency · Kafka Event Flow · Redis Sorted Set · k6 Verification',
              },
            ],
          },
          {
            type: 'cards',
            label: 'TECH STACK',
            columns: 4,
            items: [
              {
                label: 'Backend',
                text: 'Java 17 · Spring Boot · Spring Security · JPA · QueryDSL · MySQL',
              },
              {
                label: 'Cache & Messaging',
                text: 'Redis · Redisson · Kafka',
              },
              {
                label: 'Test',
                text: 'JUnit 5 · Mockito · MockMvc · Embedded Kafka · k6',
              },
              {
                label: 'Infra',
                text: 'Docker Compose · Gradle',
              },
            ],
          },
        ],
      },
      {
        number: '02',
        id: 'design-problem',
        title: 'Design Problem',
        navTitle: 'Design Problem',
        lead: '요구사항은 단순했지만, 핵심은 “왜 이 구조로 설계했는가”를 설명하는 것이었습니다.',
        content: [
          {
            type: 'prose',
            paragraphs: [
              '메뉴 조회, 포인트 충전, 커피 주문·결제와 인기 메뉴 조회는 단순한 기능처럼 보였습니다. 하지만 다수 서버 인스턴스에서도 같은 결과를 보장하고, 동시 주문이 몰려도 포인트 잔액이 음수가 되지 않으며, 주문 이후의 집계와 데이터 수집이 주문 트랜잭션을 방해하지 않도록 설계해야 했습니다.',
              '따라서 기능 구현보다 동시성, 데이터 일관성과 확장성을 기준으로 기술 선택의 이유를 설명하는 데 집중했습니다.',
            ],
          },
          {
            type: 'cards',
            label: 'DESIGN RISKS',
            columns: 4,
            items: [
              {
                label: '동시성 문제',
                text: '동일 사용자가 여러 주문을 동시에 요청하면 같은 잔액을 기준으로 여러 주문이 통과할 수 있습니다.',
              },
              {
                label: '정합성 문제',
                text: '포인트 차감, 주문 저장과 거래 이력 기록은 하나의 트랜잭션처럼 일관되게 처리되어야 합니다.',
              },
              {
                label: '이벤트 문제',
                text: '롤백된 주문이 Kafka로 발행되면 존재하지 않는 주문을 Consumer가 처리하는 유령 이벤트가 생길 수 있습니다.',
              },
              {
                label: '집계 문제',
                text: '주문이 쌓일수록 인기 메뉴 DB 집계 비용이 커지므로 실시간성과 성능의 균형이 필요했습니다.',
              },
            ],
          },
          {
            type: 'cards',
            label: 'REQUIREMENTS / DESIGN CRITERIA',
            columns: 2,
            items: [
              {
                label: '필수 기능',
                text: '메뉴 조회 · 포인트 충전 · 커피 주문/결제 · 인기 메뉴 TOP 3 조회',
              },
              {
                label: '설계 기준',
                text: '멀티 인스턴스 대응 · 동시성 제어 · 데이터 일관성 · 테스트 기반 검증',
              },
            ],
          },
        ],
      },
      {
        number: '03',
        id: 'order-flow',
        title: 'Order Flow',
        navTitle: 'Order Flow',
        lead: '주문 요청은 락, 트랜잭션과 이벤트 발행 시점을 지나며 단계적으로 처리됩니다.',
        content: [
          {
            type: 'flow',
            items: [
              '주문 요청',
              'OrderFacade',
              'Redis 분산락 획득',
              'OrderService 트랜잭션 시작',
              '사용자 포인트 조회 및 검증',
              '포인트 차감',
              '포인트 이력 기록',
              '주문 저장',
              'OrderCreatedEvent 발행',
              'DB Commit',
              'AFTER_COMMIT Kafka 발행',
              'Consumer 처리',
              '주문 상태 변경 / 인기 메뉴 갱신',
            ],
          },
          {
            type: 'prose',
            paragraphs: [
              '주문 생성은 단순히 주문 데이터를 저장하는 작업이 아니었습니다. 동일 사용자의 요청이 여러 서버 인스턴스로 동시에 들어올 수 있어 Redis 분산락으로 먼저 직렬화했습니다.',
              'OrderService 트랜잭션 안에서는 포인트 검증, 차감, 거래 이력 기록과 주문 저장을 함께 처리했습니다. Kafka는 트랜잭션 안에서 직접 호출하지 않고 내부 이벤트를 거쳐 DB 커밋이 끝난 AFTER_COMMIT 시점에만 발행했습니다.',
            ],
          },
          {
            type: 'cards',
            label: 'RESPONSIBILITY',
            columns: 4,
            items: [
              {
                label: 'OrderFacade',
                text: '사용자 기준 Redis 분산락의 획득과 해제를 담당합니다.',
              },
              {
                label: 'OrderService',
                text: '주문 생성, 포인트 차감, 이력 기록과 주문 저장 트랜잭션을 담당합니다.',
              },
              {
                label: 'OrderEventListener',
                text: 'DB 커밋 이후 Kafka 이벤트 발행을 담당합니다.',
              },
              {
                label: 'OrderListener / OrderKafkaService',
                text: 'Kafka Consumer에서 주문 후속 처리와 인기 메뉴 집계를 담당합니다.',
              },
            ],
          },
        ],
      },
      {
        number: '04',
        id: 'point-consistency',
        title: 'Point Consistency',
        navTitle: 'Point Consistency',
        lead: 'Redis 분산락과 DB 비관락을 함께 사용해 동일 사용자 포인트 변경의 정합성을 지켰습니다.',
        content: [
          {
            type: 'cards',
            columns: 3,
            items: [
              {
                label: 'PROBLEM',
                text: '잔액 9,000P에서 3,000P 주문 100건이 동시에 들어오면 실제로는 3건만 성공해야 합니다. 제어가 없다면 같은 잔액을 기준으로 여러 요청이 통과해 음수 잔액이나 이력 불일치가 생길 수 있습니다.',
              },
              {
                label: 'DECISION',
                text: '주문 생성은 Redis 분산락으로 동일 사용자의 요청을 직렬화하고, 트랜잭션 내부에서는 User 행에 DB 비관락을 적용해 최종 정합성을 보장했습니다.',
              },
              {
                label: 'IMPLEMENTATION',
                text: 'OrderFacade가 분산락을, OrderService가 주문 트랜잭션을 담당하도록 분리해 DB 커밋 이후 락이 해제되도록 구성했습니다.',
              },
            ],
          },
          {
            type: 'cards',
            label: 'LOCK STRATEGY',
            columns: 5,
            items: [
              {
                label: '주문 생성',
                text: 'Redis 분산락 + DB 비관락',
              },
              {
                label: '포인트 충전',
                text: '발생 빈도보다 정합성을 우선해 DB 비관락을 적용했습니다.',
              },
              {
                label: '주문 취소',
                text: '포인트 복구 정합성을 위해 DB 비관락을 적용했습니다.',
              },
              {
                label: '락 기준',
                text: '사용자별 lock:order:{userId}',
              },
              {
                label: '책임 분리',
                text: 'Facade는 락, Service는 트랜잭션을 담당합니다.',
              },
            ],
          },
          {
            type: 'callout',
            label: 'WHY REDISSON',
            text: 'Lettuce 스핀락은 획득 실패 시 Redis에 반복 요청을 보내 트래픽이 몰릴수록 부하가 커질 수 있습니다. Redisson RLock은 Pub/Sub 기반으로 락 해제를 기다릴 수 있어 불필요한 요청을 줄이고 획득·해제 로직도 단순화할 수 있었습니다.',
          },
          {
            type: 'metrics',
            label: '100 CONCURRENT ORDERS',
            items: [
              { label: 'REQUESTS', value: '100', tone: 'dark' },
              { label: 'SUCCESS', value: '3', tone: 'primary' },
              { label: 'REJECTED', value: '97' },
              { label: 'OTHER FAILURES', value: '0' },
              { label: 'FINAL BALANCE', value: '0P', tone: 'primary' },
            ],
          },
          {
            type: 'metrics',
            label: '50 CONCURRENT CHARGES',
            items: [
              { label: 'REQUESTS', value: '50', tone: 'dark' },
              { label: 'SUCCESS', value: '50', tone: 'primary' },
              { label: 'FAILURES', value: '0' },
              {
                label: 'REFLECTED',
                value: '+50,000P',
                note: '시작 잔액 기준 누락 없이 반영',
                tone: 'primary',
              },
            ],
          },
        ],
      },
      {
        number: '05',
        id: 'event-processing',
        title: 'Event Processing',
        navTitle: 'Event Processing',
        lead: 'DB 커밋 이후에만 Kafka 이벤트를 발행해 롤백된 주문의 유령 이벤트를 차단했습니다.',
        content: [
          {
            type: 'cards',
            columns: 3,
            items: [
              {
                label: 'PROBLEM',
                text: 'DB 커밋 전에 Kafka 메시지가 도착한 뒤 트랜잭션이 롤백되면, DB에는 주문이 없지만 Consumer는 존재하지 않는 주문을 처리하는 유령 이벤트가 발생합니다.',
              },
              {
                label: 'DECISION',
                text: 'OrderService는 Spring 내부 OrderCreatedEvent만 발행하고, @TransactionalEventListener(AFTER_COMMIT)가 DB 커밋 성공 이후 Kafka Producer를 호출하도록 했습니다.',
              },
              {
                label: 'RESULT',
                text: 'DB 롤백 시 Kafka 발행 자체가 실행되지 않아 인기 메뉴 카운터와 후속 데이터 흐름이 오염되는 것을 차단했습니다.',
              },
            ],
          },
          {
            type: 'cards',
            label: 'EVENT RESPONSIBILITY',
            columns: 4,
            items: [
              {
                label: 'OrderService',
                text: '포인트 차감, 이력 기록과 주문 저장 후 내부 이벤트를 발행합니다.',
              },
              {
                label: 'OrderEventListener',
                text: 'AFTER_COMMIT 시점에 Kafka Producer를 호출합니다.',
              },
              {
                label: 'Kafka Consumer',
                text: '주문 후속 처리와 Redis 인기 메뉴 카운터 갱신을 수행합니다.',
              },
              {
                label: 'DLT + FixedBackOff',
                text: 'Consumer 처리 실패 시 정해진 횟수만큼 재시도한 뒤 DLT로 이동합니다.',
              },
            ],
          },
          {
            type: 'states',
            items: [
              { label: 'DAILY SORTED SET', value: 'popular:menus:{date} · 8일 TTL' },
              { label: '7-DAY RESULT CACHE', value: 'popular:menus:result · 1시간 TTL' },
              { label: 'RANKING', value: '최근 7일 주문 횟수 합산 · TOP 3' },
            ],
          },
          {
            type: 'prose',
            paragraphs: [
              '주문 이벤트를 수신한 Consumer는 Redis Sorted Set으로 날짜별 메뉴 주문 횟수를 누적했습니다. 조회 시 최근 7일 키를 합산하고 TOP 3 결과는 별도의 result 키에 캐싱했습니다.',
            ],
          },
          {
            type: 'cards',
            label: 'TRADE-OFF',
            columns: 3,
            items: [
              {
                label: '매 요청 ZUNIONSTORE',
                text: '항상 최신 결과를 제공하지만 조회 트래픽이 늘수록 Redis 합산 연산도 반복됩니다.',
              },
              {
                label: 'result 키 캐싱',
                text: '반복 합산을 줄이는 대신 최대 1시간의 데이터 지연 가능성이 있습니다.',
              },
              {
                label: '선택',
                text: '인기 메뉴는 금융성 실시간 데이터가 아니므로 짧은 지연보다 Redis 부하를 일정하게 유지하는 편이 적합하다고 판단했습니다.',
              },
            ],
          },
          {
            type: 'callout',
            label: 'DB / REDIS TRANSACTION BOUNDARY',
            text: 'DB 트랜잭션은 Redis 작업을 롤백하지 못합니다. 정합성이 중요한 주문 상태와 포인트 이력을 먼저 DB에서 처리하고 Redis 집계는 분리했습니다. Redis 실패는 주문을 롤백시키지 않고 Kafka 재시도와 DLT를 통해 다시 처리될 기회를 갖도록 구성했습니다.',
          },
        ],
      },
      {
        number: '06',
        id: 'verification-result',
        title: 'Verification & Result',
        navTitle: 'Verification & Result',
        lead: '설계한 동시성 제어와 이벤트 흐름이 실제 테스트에서도 의도대로 동작하는지 검증했습니다.',
        content: [
          {
            type: 'cards',
            label: 'RESULT',
            columns: 5,
            items: [
              {
                label: '주문 동시성 검증',
                text: '100건 동시 주문에서 3건만 성공하고 97건은 잔액 부족으로 거절됐으며 최종 잔액은 0P였습니다.',
              },
              {
                label: '포인트 충전 정합성',
                text: '50건의 동시 충전이 모두 성공하고 최종 잔액은 정확히 50,000P 증가했습니다.',
              },
              {
                label: 'Kafka 이벤트 흐름',
                text: 'DB 커밋 이후에만 Kafka 이벤트를 발행해 롤백 주문의 후속 처리를 차단했습니다.',
              },
              {
                label: '인기 메뉴 집계',
                text: '주문 이벤트를 기반으로 Redis Sorted Set의 메뉴별 카운터가 갱신되도록 구성했습니다.',
              },
              {
                label: 'DLT / 재시도',
                text: 'Consumer 실패 시 재시도 후 DLT로 이동시켜 메시지를 다시 처리할 수 있게 했습니다.',
              },
            ],
          },
          {
            type: 'cards',
            label: 'LEARNED',
            columns: 5,
            items: [
              {
                label: '락의 범위가 중요하다',
                text: '락의 사용 여부보다 주문 트랜잭션 전체를 올바른 범위로 감싸는 것이 중요했습니다.',
              },
              {
                label: '기능별 전략은 달라야 한다',
                text: '주문 생성은 분산락, 충전과 취소는 비관락으로 나눠 적용했습니다.',
              },
              {
                label: '발행 시점이 정합성을 만든다',
                text: 'Kafka도 DB 커밋 이전에 발행하면 오히려 데이터 불일치를 만들 수 있었습니다.',
              },
              {
                label: 'Redis는 DB 트랜잭션 밖에 있다',
                text: 'DB 작업과 Redis 작업의 실패 가능성을 분리해 설계해야 했습니다.',
              },
              {
                label: '테스트는 설계의 증거다',
                text: 'k6 동시 요청으로 설계한 락과 이벤트 구조가 실제로 동작하는지 확인했습니다.',
              },
            ],
          },
        ],
      },
    ],
  },
  readys7: {
    projectLabel: 'Ready’s7',
    description:
      '개발자 용역 매칭 플랫폼의 통합 검색에 Redis Cache를 적용하고 5만 건 이상의 데이터와 k6 부하 테스트로 검색 성능을 검증한 케이스 스터디입니다.',
    sections: [
      {
        number: '01',
        id: 'overview',
        title: 'Overview',
        navTitle: 'Overview',
        lead:
          '반복 검색이 많은 개발자 매칭 플랫폼에서 Redis Cache와 k6 테스트로 검색 응답 성능을 검증했습니다.',
        content: [
          {
            type: 'callout',
            text: '개발자와 클라이언트를 연결하는 플랫폼에서 반복 검색 요청의 응답 속도와 DB 부하를 개선했습니다.',
          },
          {
            type: 'prose',
            paragraphs: [
              'Ready’s7은 프로젝트를 의뢰하는 클라이언트와 기술 역량을 가진 개발자를 연결하는 개발자 용역 매칭 플랫폼입니다.',
              '저는 인증/인가, 클라이언트, 관리자와 검색 도메인을 담당했습니다. 검색에서는 프로젝트·카테고리·스킬·개발자를 함께 조회하는 통합 검색과 Redis Sorted Set 기반 인기 검색어를 구현했습니다.',
              '이후 Redis Cache를 적용한 검색 API에 5만 건 이상의 데이터와 k6 부하 테스트를 구성해 적용 전후의 응답 시간과 처리량 차이를 검증했습니다.',
            ],
          },
          {
            type: 'facts',
            items: [
              { label: 'ROLE', value: 'Backend' },
              { label: 'TEAM', value: '5인 팀 프로젝트' },
              { label: 'PERIOD', value: '2026.03 - 2026.04' },
              {
                label: 'FOCUS',
                value: 'Global Search · Redis Cache · Popular Search · k6 Test',
              },
            ],
          },
          {
            type: 'cards',
            label: 'RESPONSIBILITY',
            columns: 4,
            items: [
              {
                label: 'Auth / Authorization',
                text: 'JWT 기반 인증과 권한 흐름을 구현했습니다.',
              },
              {
                label: 'Client',
                text: '클라이언트 정보 조회 및 수정 기능을 담당했습니다.',
              },
              {
                label: 'Admin',
                text: '관리자 승인 및 관리 API를 구현했습니다.',
              },
              {
                label: 'Search',
                text: '통합 검색, 인기 검색어와 Redis 캐시 성능 테스트를 담당했습니다.',
              },
            ],
          },
        ],
      },
      {
        number: '02',
        id: 'search-problem',
        title: 'Search Problem',
        navTitle: 'Search Problem',
        lead: '같은 키워드가 반복될수록 동일한 DB 조회 비용이 계속 발생했습니다.',
        content: [
          {
            type: 'prose',
            paragraphs: [
              'Ready’s7에서는 사용자가 Java, Spring, React, Docker 같은 키워드로 프로젝트와 개발자를 반복해서 탐색합니다.',
              '통합 검색은 단일 테이블 조회가 아니라 프로젝트, 카테고리, 스킬과 개발자 도메인을 함께 조회합니다. 캐시가 없다면 동일 키워드도 매번 같은 DB 조회로 이어졌습니다.',
            ],
          },
          {
            type: 'cards',
            label: 'SEARCH RISKS',
            columns: 4,
            items: [
              {
                label: '반복 검색',
                text: '같은 키워드 요청이 여러 사용자에게서 반복됩니다.',
              },
              {
                label: '다중 도메인 조회',
                text: '하나의 요청에서 4개 도메인을 함께 검색합니다.',
              },
              {
                label: 'DB 부하 증가',
                text: '동시 요청이 많아질수록 같은 조회 비용도 반복됩니다.',
              },
              {
                label: '검증 필요',
                text: '단건 Postman 테스트만으로는 동시 부하의 성능 차이를 확인하기 어렵습니다.',
              },
            ],
          },
        ],
      },
      {
        number: '03',
        id: 'search-scope',
        title: 'Search Scope',
        navTitle: 'Search Scope',
        lead: '통합 검색은 4개 도메인을 하나의 검색 경험으로 묶는 기능이었습니다.',
        content: [
          {
            type: 'prose',
            paragraphs: [
              '검색 키워드에 대해 프로젝트 공고와 개발자 정보를 한 번에 탐색할 수 있도록 각 도메인의 검색 조건과 응답 구조를 연결했습니다.',
              '초기 통합 검색 구조에서는 QueryDSL을 활용해 도메인별 검색 조건을 구현했습니다.',
            ],
          },
          {
            type: 'cards',
            label: 'SEARCH TARGET',
            columns: 4,
            items: [
              {
                label: 'Project',
                text: '프로젝트 제목, 설명과 요구 기술을 검색합니다.',
              },
              {
                label: 'Category',
                text: '프로젝트 카테고리를 검색합니다.',
              },
              {
                label: 'Skill',
                text: '기술 스택 키워드를 검색합니다.',
              },
              {
                label: 'Developer',
                text: '개발자 프로필과 보유 기술을 검색합니다.',
              },
            ],
          },
          {
            type: 'cards',
            label: 'SEARCH API',
            columns: 3,
            items: [
              {
                label: 'v1 Search',
                text: '캐시를 적용하지 않은 검색 API입니다.',
              },
              {
                label: 'v2 Search',
                text: 'Redis Cache를 적용한 비교 대상 API입니다.',
              },
              {
                label: 'Popular Search',
                text: 'Redis Sorted Set 기반 인기 검색어 API입니다.',
              },
            ],
          },
          {
            type: 'callout',
            label: 'CONTRIBUTION SCOPE',
            text: '최종 코드의 MySQL FULLTEXT 인덱싱은 이후 팀 작업 범위일 수 있으므로 개인 성과로 포함하지 않았습니다. 이 케이스 스터디는 제가 담당한 통합 검색 구조와 Redis 캐시 성능 검증에 집중합니다.',
          },
        ],
      },
      {
        number: '04',
        id: 'cache-strategy',
        title: 'Cache Strategy',
        navTitle: 'Cache Strategy',
        lead: '동일 키워드 검색 결과는 여러 사용자가 공유할 수 있어 Redis Cache가 적합했습니다.',
        content: [
          {
            type: 'prose',
            paragraphs: [
              '검색 API는 동일한 키워드와 페이지 조건이면 같은 결과를 반환하는 읽기 중심 기능입니다. 같은 “Spring” 검색이 100번 반복돼도 첫 요청만 DB를 조회하고 이후 요청은 Redis에서 응답할 수 있습니다.',
            ],
          },
          {
            type: 'flow',
            items: [
              'Search Request',
              'Redis Lookup',
              'Cache Hit → Response',
              'Cache Miss → DB Query',
              'Result Cache Store',
              'Response',
            ],
          },
          {
            type: 'states',
            items: [
              { label: 'CACHE STRATEGY', value: 'Cache-Aside' },
              { label: 'CACHE KEY', value: 'keyword + page + size' },
              { label: 'CACHE HIT', value: 'Redis 결과 즉시 반환' },
              { label: 'CACHE MISS', value: 'DB 조회 후 Redis 저장' },
            ],
          },
          {
            type: 'cards',
            label: 'WHY REDIS',
            columns: 3,
            items: [
              {
                label: 'Local Cache',
                text: '서버 인스턴스마다 캐시가 분리됩니다.',
              },
              {
                label: 'Redis',
                text: '모든 서버 인스턴스가 중앙 캐시를 공유합니다.',
              },
              {
                label: '선택 이유',
                text: 'Scale Out 환경에서도 같은 캐시 결과와 키를 공유하기 위해 Redis를 선택했습니다.',
              },
            ],
          },
          {
            type: 'cards',
            label: 'POPULAR SEARCH',
            columns: 3,
            items: [
              {
                label: 'Redis Sorted Set',
                text: '검색어를 score와 함께 저장합니다.',
              },
              {
                label: 'ZINCRBY',
                text: '검색될 때마다 키워드 점수를 증가시킵니다.',
              },
              {
                label: 'ZREVRANGE',
                text: '점수가 높은 상위 검색어를 조회합니다.',
              },
            ],
          },
        ],
      },
      {
        number: '05',
        id: 'performance-test',
        title: 'Performance Test',
        navTitle: 'Performance Test',
        lead: '5만 건 이상의 데이터를 구성하고 k6로 캐시 적용 전후를 비교했습니다.',
        content: [
          {
            type: 'prose',
            paragraphs: [
              '소량 데이터에서는 DB 조회도 충분히 빨라 캐시 효과가 선명하지 않았습니다. 검색 비중이 높은 Project를 중심으로 50,009건을 구성했습니다.',
              'JPA save() 반복 대신 JDBC Batch Insert로 1,000건씩 적재해 DB 왕복을 줄였습니다.',
              '단건 확인용 Postman 대신 최대 100 VU의 k6 Ramp Up으로 사용자를 점진적으로 늘려 서버 웜업과 커넥션 풀 영향을 완화했습니다.',
            ],
          },
          {
            type: 'cards',
            label: 'TEST CONDITION',
            columns: 5,
            items: [
              { label: 'DATA', text: 'Project 중심 50,009건' },
              { label: 'KEYWORDS', text: 'Java · Spring · React · Python · Docker' },
              { label: 'TOOL', text: 'k6' },
              { label: 'LOAD', text: '최대 100 VU · Ramp Up' },
              { label: 'COMPARE', text: 'v1 Cache Off vs v2 Redis Cache' },
            ],
          },
          {
            type: 'cards',
            label: 'V1 / V2 COMPARISON',
            columns: 2,
            items: [
              {
                label: 'v1 · CACHE OFF',
                text: '총 2,436건 · 평균 1,940ms · 최대 4,980ms · 16.19 TPS · 실패율 0%',
                tone: 'dark',
              },
              {
                label: 'v2 · REDIS CACHE',
                text: '총 7,046건 · 평균 3.73ms · 최대 547.83ms · 46.68 TPS · 실패율 0%',
                tone: 'primary',
              },
            ],
          },
          {
            type: 'metrics',
            label: 'PERFORMANCE CHANGE',
            items: [
              {
                label: 'AVG RESPONSE · BEFORE',
                value: '1,940ms',
                tone: 'dark',
              },
              {
                label: 'AVG RESPONSE · AFTER',
                value: '3.73ms',
                tone: 'primary',
              },
              {
                label: 'THROUGHPUT · BEFORE',
                value: '16.19',
                note: 'TPS',
              },
              {
                label: 'THROUGHPUT · AFTER',
                value: '46.68',
                note: 'TPS',
                tone: 'primary',
              },
              {
                label: 'FAILURE RATE',
                value: '0%',
                note: 'v1 / v2 동일',
              },
            ],
          },
          {
            type: 'callout',
            label: 'CACHE HIT',
            text: '동일 조건의 반복 검색 대부분이 Cache Hit으로 처리되면서 평균 응답 시간은 1,940ms에서 3.73ms로 줄고 처리량은 16.19 TPS에서 46.68 TPS로 증가했습니다.',
          },
        ],
      },
      {
        number: '06',
        id: 'result',
        title: 'Result & Learned',
        navTitle: 'Result',
        lead: '검색 성능 개선은 캐시를 붙이는 것보다 요청 패턴과 데이터 규모를 가정해 검증하는 과정이 중요했습니다.',
        content: [
          {
            type: 'cards',
            label: 'RESULT',
            columns: 5,
            items: [
              {
                label: '통합 검색 구현',
                text: '4개 도메인을 하나의 검색 흐름으로 연결했습니다.',
              },
              {
                label: 'Redis Cache 적용',
                text: '동일 조건의 반복 검색을 Cache Hit으로 처리했습니다.',
              },
              {
                label: '인기 검색어 구현',
                text: 'Redis Sorted Set으로 검색어 점수를 누적했습니다.',
              },
              {
                label: '대량 데이터 구성',
                text: '50,009건의 프로젝트 검색 데이터를 구성했습니다.',
              },
              {
                label: 'k6 성능 검증',
                text: '캐시 적용 전후를 같은 부하 조건에서 비교했습니다.',
              },
              {
                label: '응답 속도 개선',
                text: '평균 응답 시간이 1,940ms에서 3.73ms로 줄었습니다.',
              },
              {
                label: '처리량 증가',
                text: '처리량이 16.19 TPS에서 46.68 TPS로 증가했습니다.',
              },
            ],
          },
          {
            type: 'cards',
            label: 'LEARNED',
            columns: 5,
            items: [
              {
                label: '요청 패턴을 먼저 본다',
                text: '반복 요청이 많은 읽기 API에서 캐시 효과가 컸습니다.',
              },
              {
                label: 'Scale Out을 고려한다',
                text: '여러 서버가 공유해야 할 때 Local Cache보다 Redis가 적합했습니다.',
              },
              {
                label: '데이터 규모가 필요하다',
                text: '충분한 데이터가 있어야 성능 차이를 의미 있게 측정할 수 있었습니다.',
              },
              {
                label: '도구의 목적이 다르다',
                text: 'Postman은 단건 확인, k6는 동시 사용자 검증에 적합했습니다.',
              },
              {
                label: '키 조건을 구분한다',
                text: 'keyword뿐 아니라 page와 size도 캐시 키에 포함해야 했습니다.',
              },
              {
                label: '정합성을 함께 본다',
                text: '데이터 변경 시 캐시 무효화 정책도 함께 고려해야 했습니다.',
              },
              {
                label: '기여 범위를 구분한다',
                text: 'FULLTEXT와 제가 담당한 통합 검색·캐시 검증 범위를 분리해 설명했습니다.',
              },
            ],
          },
        ],
      },
    ],
  },
};

caseStudies['k-server'] = {
  projectLabel: 'K-server',
  description:
    '다중 인스턴스 주문 환경에서 포인트 정합성과 Kafka 후속 이벤트 흐름을 분리해 검증한 백엔드 Case Study입니다.',
  sections: [
    {
      number: '01',
      id: 'overview',
      title: 'Overview',
      navTitle: '개요',
      navSubtitle: '정합성 중심 설계',
      lead: '다중 인스턴스 주문 환경에서\n포인트 정합성과 이벤트 흐름을 검증했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '동일 사용자의 주문, 충전, 취소 요청이 동시에 들어와도 포인트 잔액과 거래 이력이 어긋나지 않도록 처리했습니다.',
            'Redis 분산락과 DB 비관락으로 포인트 변경 경합을 제어하고, DB 커밋 이후에만 Kafka 이벤트가 발행되도록 후속 처리 경계를 분리했습니다.',
          ],
        },
        {
          type: 'facts',
          items: [
            { label: '역할', value: 'Solo Backend' },
            { label: '프로젝트 유형', value: 'Personal Project' },
            { label: '기간', value: '2026.04 - 2026.05' },
            { label: '서비스', value: '다중 인스턴스 환경을 가정한 커피숍 주문 시스템' },
          ],
        },
        {
          type: 'cards',
          label: '구현 범위',
          columns: 3,
          items: [
            {
              label: '주문 동시성 제어',
              text: '동일 사용자 주문 요청을 Redis 분산락으로 직렬화하고,\n트랜잭션 내부에서는 DB 비관락으로 포인트 잔액을 검증했습니다.',
            },
            {
              label: '트랜잭션 경계 분리',
              text: 'Facade는 분산락을 담당하고,\nService는 주문 트랜잭션을 담당하도록 책임을 나눴습니다.',
            },
            {
              label: 'Kafka 후속 처리',
              text: 'DB 커밋 이후에만 Kafka 이벤트가 발행되도록 분리해\n롤백 주문이 후속 처리로 넘어가지 않게 했습니다.',
            },
          ],
        },
      ],
    },
    {
      number: '02',
      id: 'problem',
      title: 'Problem',
      navTitle: '동시성 문제',
      navSubtitle: '포인트 경합과 이벤트',
      lead: '동시 주문과 후속 이벤트가 포인트 정합성을 깨뜨릴 수 있었습니다.',
      content: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: '동일 사용자 주문 경합',
              text: '같은 사용자의 주문이 동시에 들어오면 잔액 차감이 중복되거나 갱신이 누락될 수 있었습니다.',
            },
            {
              label: '공통 잔액 변경',
              text: '주문, 충전, 취소가 모두 같은 포인트 잔액을 변경하므로 처리 기준이 일관돼야 했습니다.',
            },
            {
              label: '롤백 주문 이벤트',
              text: 'DB에서 롤백된 주문이 Kafka 후속 처리로 넘어가면 인기 메뉴 집계가 실제 주문과 달라질 수 있었습니다.',
            },
          ],
        },
        {
          type: 'callout',
          text: '핵심은 락을 하나 더 쓰는 것이 아니라, 사용자 단위 요청 직렬화와 트랜잭션 내부 정합성 검증, 이벤트 발행 시점을 분리하는 것이었습니다.',
        },
      ],
    },
    {
      number: '03',
      id: 'approach',
      title: 'Approach',
      navTitle: '접근 방식',
      navSubtitle: '락과 트랜잭션 분리',
      lead: '락, 트랜잭션, 이벤트 발행 시점을 역할별로 분리했습니다.',
      content: [
        {
          type: 'approach',
          steps: ['요청 진입', 'Redis 분산락', 'Service 트랜잭션', 'DB 비관락', 'DB Commit', 'AFTER_COMMIT', 'Kafka 처리'],
          items: [
            {
              label: 'Redis 분산락',
              text: '다중 인스턴스 환경에서 동일 사용자의 주문 요청이 동시에 처리되지 않도록 사용자 단위 요청을 직렬화했습니다.',
            },
            {
              label: 'DB 비관락',
              text: '주문, 충전, 취소 트랜잭션 내부에서 포인트 잔액을 다시 확인해 거래 이력과 잔액이 함께 맞도록 처리했습니다.',
              tone: 'primary',
            },
            {
              label: 'AFTER_COMMIT 이벤트',
              text: '주문 트랜잭션이 커밋된 이후에만 Kafka 이벤트가 발행되도록 분리해 롤백 주문의 후속 처리를 차단했습니다.',
            },
          ],
        },
      ],
    },
    {
      number: '04',
      id: 'decision',
      title: 'Decision',
      navTitle: '핵심 의사결정',
      navSubtitle: '기술 선택과 책임 분리',
      lead: '포인트 정합성과 이벤트 신뢰성을 기준으로 처리 경계를 나눴습니다.',
      content: [
        {
          type: 'tabs',
          tabs: [
            {
              id: 'lock-strategy',
              label: 'Redis 분산락 + DB 비관락',
              title: '분산 환경 직렬화와 트랜잭션 내부 검증을 함께 사용했습니다.',
              text: 'Redis 분산락은 여러 인스턴스로 들어오는 동일 사용자 요청을 먼저 직렬화합니다.\nDB 비관락은 실제 포인트 변경 트랜잭션 안에서 잔액과 거래 이력을 다시 검증하는 기준으로 사용했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: 'Redis 분산락', text: '사용자 단위 요청을 먼저 묶어 같은 사용자의 주문이 동시에 통과하지 않도록 했습니다.' },
                  { label: 'DB 비관락', text: '잔액 차감, 충전, 취소처럼 같은 포인트 row를 변경하는 흐름에서 최종 정합성을 확인했습니다.' },
                  { label: '적용 기준', text: '주문 생성은 분산락과 DB 비관락을 함께 사용하고, 충전과 취소는 DB 비관락 중심으로 처리했습니다.' },
                ],
              },
              callout: '분산락은 진입 순서를 제어하고, DB 락은 트랜잭션 내부의 포인트 정합성을 확인하는 역할로 나눴습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'facade-service',
              label: 'Facade / Service 책임 분리',
              title: '락 책임과 주문 트랜잭션 책임을 분리했습니다.',
              text: 'Facade는 Redis 분산락의 획득과 해제를 담당하고, Service는 주문 생성과 포인트 변경 트랜잭션을 담당했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: 'Facade', text: '분산락 키 생성, 락 획득, Service 호출, 락 해제 경계를 담당했습니다.' },
                  { label: 'Service', text: '포인트 잔액 검증, 차감, 거래 이력 저장, 주문 저장을 하나의 DB 처리 흐름으로 관리했습니다.' },
                  { label: '경계', text: 'DB 커밋 이전에 락이 풀리지 않도록 트랜잭션과 락 해제 시점을 분리해 관리했습니다.' },
                ],
              },
              callout: '락과 트랜잭션을 같은 메서드에 섞지 않고, 실패 위치를 추적하기 쉬운 책임 구조로 나눴습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'after-commit',
              label: 'AFTER_COMMIT 이벤트 발행',
              title: 'DB 커밋 이후에만 Kafka 이벤트가 발행되도록 분리했습니다.',
              text: 'OrderService는 내부 이벤트만 발행하고, Kafka Producer 호출은 AFTER_COMMIT 리스너에서 수행하도록 분리했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '커밋 이전', text: '주문 저장과 포인트 차감이 DB 트랜잭션 안에서 처리됩니다.' },
                  { label: '커밋 이후', text: '커밋이 완료된 주문만 Kafka 이벤트 발행 대상으로 넘어갑니다.' },
                  { label: '롤백 주문 차단', text: 'DB에서 롤백된 주문은 인기 메뉴 집계나 주문 후속 처리로 전달되지 않게 했습니다.' },
                ],
              },
              callout: 'Kafka와 DB를 하나의 트랜잭션으로 묶지 않고, DB 커밋 이후 후속 이벤트가 실행되도록 경계를 분리했습니다.',
              calloutTone: 'soft',
            },
          ],
        },
      ],
    },
    {
      number: '05',
      id: 'implementation',
      title: 'Implementation',
      navTitle: '구현 포인트',
      navSubtitle: '주문과 이벤트 처리',
      lead: '주문 처리, 포인트 변경, Kafka 후속 처리를 각각의 책임으로 구현했습니다.',
      content: [
        {
          type: 'tabs',
          tabs: [
            {
              id: 'order-concurrency',
              label: '주문 동시성 처리',
              title: '동일 사용자 주문 요청을 사용자 단위로 직렬화했습니다.',
              text: '주문 요청은 Facade에서 사용자 기준 Redis 분산락을 먼저 획득한 뒤 Service 트랜잭션으로 진입하도록 구성했습니다.',
              flow: ['주문 요청', 'lock:order:{userId}', 'Redis 분산락 획득', 'OrderService 호출', 'DB 비관락 조회', '잔액 검증', '주문 저장', '락 해제'],
              cards: {
                columns: 3,
                items: [
                  { label: '락 키', text: '동일 사용자의 주문 요청이 같은 락 키를 바라보도록 사용자 단위 키를 사용했습니다.' },
                  { label: '트랜잭션 진입', text: '락 획득 이후에 주문 Service를 호출해 포인트 변경 흐름이 순차적으로 실행되게 했습니다.' },
                  { label: '실패 처리', text: '잔액 부족 주문은 저장되지 않고 거절되며, 포인트 잔액은 음수로 내려가지 않도록 검증했습니다.' },
                ],
              },
            },
            {
              id: 'point-flow',
              label: '포인트 변경 흐름',
              title: '주문, 충전, 취소가 같은 잔액 기준을 사용하도록 처리했습니다.',
              text: '포인트 잔액을 변경하는 기능은 거래 이력과 잔액이 함께 맞는지 확인하는 흐름으로 구성했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '주문', text: '잔액 확인, 포인트 차감, 거래 이력 저장, 주문 저장을 같은 처리 흐름에서 관리했습니다.' },
                  { label: '충전', text: '동일 계정 충전 요청이 동시에 들어와도 기준 잔액에 요청 수만큼 누락 없이 반영되도록 검증했습니다.' },
                  { label: '취소', text: '주문 취소 시 포인트 복구와 거래 이력이 함께 맞도록 DB 비관락 기준으로 처리했습니다.' },
                ],
              },
              callout: '포인트는 단순 숫자 변경이 아니라 잔액, 거래 이력, 주문 상태가 함께 맞아야 하는 도메인으로 다뤘습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'kafka-processing',
              label: 'Kafka 후속 처리',
              title: '커밋된 주문만 Kafka 후속 처리로 이어지도록 구성했습니다.',
              text: 'Kafka Consumer는 커밋 이후 발행된 주문 이벤트만 받아 주문 후속 처리와 Redis 인기 메뉴 카운트를 갱신합니다.',
              cards: {
                columns: 3,
                items: [
                  { label: 'Producer 경계', text: 'OrderService 내부에서 Kafka를 직접 호출하지 않고 AFTER_COMMIT 리스너에서 발행했습니다.' },
                  { label: 'Consumer 처리', text: '커밋된 주문 이벤트를 기준으로 주문 후속 처리와 Redis 인기 메뉴 카운트를 갱신했습니다.' },
                  { label: '재시도 / DLT', text: '반복 실패 메시지는 재시도 이후 DLT로 이동하도록 구성해 실패 메시지를 추적할 수 있게 했습니다.' },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      number: '06',
      id: 'result',
      title: 'Verification Result',
      navTitle: '검증 결과',
      navSubtitle: '동시 요청과 이벤트 검증',
      lead: '동일 조건의 동시 요청과 이벤트 처리 결과로 설계가 동작하는지 확인했습니다.',
      content: [
        {
          type: 'metrics',
          label: '100 CONCURRENT ORDERS',
          items: [
            { label: '초기 잔액', value: '9,000P', tone: 'dark' },
            { label: '주문 금액', value: '3,000P' },
            { label: '동시 요청', value: '100건' },
            { label: '성공', value: '3건', tone: 'primary' },
            { label: '거절', value: '97건' },
            { label: '최종 잔액', value: '0P', tone: 'primary' },
          ],
        },
        {
          type: 'metrics',
          label: '50 CONCURRENT CHARGES',
          items: [
            { label: '충전 금액', value: '1,000P' },
            { label: '동시 요청', value: '50건' },
            { label: '반영 금액', value: '+50,000P', tone: 'primary' },
          ],
        },
        {
          type: 'metrics',
          label: 'KAFKA EVENT FLOW',
          items: [
            { label: '주문 실행', value: '60건', tone: 'dark' },
            { label: 'Redis 카운트', value: '+60', tone: 'primary' },
            { label: '롤백 주문', value: '후속 처리 차단' },
          ],
        },
      ],
    },
  ],
};

caseStudies['k-server'] = {
  projectLabel: 'K-server',
  description:
    'Redis와 Kafka를 커피 주문 시스템의 주문, 포인트, 인기메뉴 흐름에 적용해 락, 트랜잭션, 이벤트 발행 경계를 검증한 개인 백엔드 Case Study입니다.',
  sections: [
    {
      number: '01',
      id: 'overview',
      title: 'Overview',
      navTitle: '개요',
      navSubtitle: '학습과 검증 흐름',
      lead: 'Redis와 Kafka를 주문·포인트 흐름에 적용해\n정합성과 이벤트 경계를 검증했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            'Redis와 Kafka를 단순 예제로만 학습하지 않고, 커피 주문 시스템의 주문, 포인트, 인기메뉴 흐름에 직접 적용했습니다.',
            '동일 사용자의 동시 주문은 Redis 분산락으로 직렬화하고, 주문·충전·취소처럼 포인트 잔액을 바꾸는 흐름은 DB 비관락으로 검증했습니다.',
            'DB 커밋 이후에만 Kafka 이벤트가 발행되도록 분리하고, k6 시나리오로 동시 요청과 이벤트 처리 결과가 의도대로 이어지는지 확인했습니다.',
          ],
        },
        {
          type: 'facts',
          items: [
            { label: '역할', value: 'Solo Backend' },
            { label: '프로젝트 유형', value: 'Personal Project' },
            { label: '기간', value: '2026.04 - 2026.05' },
            { label: '서비스', value: '다중 인스턴스 환경을 가정한 커피숍 주문 시스템' },
          ],
        },
        {
          type: 'cards',
          label: '구현 범위',
          columns: 3,
          items: [
            {
              label: 'Redis 분산락',
              text: '동일 사용자의 주문 요청을 userId 기반 락 키로 직렬화해,\n동시에 주문 트랜잭션에 진입하는 상황을 줄였습니다.',
            },
            {
              label: 'DB 비관락',
              text: '주문·충전·취소처럼 같은 포인트 잔액을 변경하는 흐름에서\n트랜잭션 내부의 최종 정합성을 확인했습니다.',
            },
            {
              label: 'Kafka 이벤트 경계',
              text: 'DB 커밋 이후에만 Kafka 이벤트가 발행되도록 분리해,\n롤백된 주문이 후속 처리로 넘어가지 않도록 했습니다.',
            },
          ],
        },
      ],
    },
    {
      number: '02',
      id: 'problem',
      title: 'Problem',
      navTitle: '동시성 문제',
      navSubtitle: '포인트 경합과 이벤트',
      lead: '동시 주문과 후속 이벤트가 포인트 정합성을 깨뜨릴 수 있었습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '단순한 주문 API에서는 문제가 없어 보이지만, 같은 사용자의 주문·충전·취소가 동시에 들어오면 포인트 잔액과 거래 이력이 어긋날 수 있습니다.',
            '또한 DB에서 롤백된 주문이 Kafka 후속 처리로 넘어가면, 인기 메뉴 집계가 실제 주문 상태와 달라질 수 있습니다.',
            '이 프로젝트에서는 Redis와 Kafka를 주문 도메인에 적용하면서, 이런 경계가 실제 서비스 흐름에서 어떻게 깨질 수 있는지를 검증 대상으로 삼았습니다.',
          ],
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: '동일 사용자 주문 경합',
              text: '같은 사용자의 주문이 동시에 들어오면 잔액 차감이 중복되거나 갱신이 누락될 수 있었습니다.',
            },
            {
              label: '공통 잔액 변경',
              text: '주문, 충전, 취소가 모두 같은 포인트 잔액을 변경하므로 처리 기준이 일관되어야 했습니다.',
            },
            {
              label: '롤백 주문 이벤트',
              text: 'DB에서 롤백된 주문이 Kafka 후속 처리로 넘어가면 인기 메뉴 집계가 실제 주문과 달라질 수 있었습니다.',
            },
          ],
        },
        {
          type: 'callout',
          text: '핵심은 기술을 하나 더 쓰는 것이 아니라, 사용자 단위 요청 직렬화, 트랜잭션 내부 정합성, 이벤트 발행 시점을 분리하는 것이었습니다.',
        },
      ],
    },
    {
      number: '03',
      id: 'approach',
      title: 'Approach',
      navTitle: '접근 방식',
      navSubtitle: '락과 트랜잭션 분리',
      lead: '락, 트랜잭션, 이벤트 발행 시점을 역할별로 분리했습니다.',
      content: [
        {
          type: 'approach',
          steps: ['요청 진입', 'Redis 분산락', 'Service 트랜잭션', 'DB 비관락', 'DB Commit', 'AFTER_COMMIT', 'Kafka 처리'],
          items: [
            {
              label: 'Redis 분산락',
              text: '다중 인스턴스 환경에서 같은 사용자의 주문 요청이 동시에 처리되지 않도록 userId 기반 락 키로 먼저 직렬화했습니다.',
            },
            {
              label: 'DB 비관락',
              text: '주문·충전·취소 트랜잭션 내부에서는 User 행을 다시 확인해 포인트 잔액과 거래 이력이 함께 맞도록 처리했습니다.',
              tone: 'primary',
            },
            {
              label: 'AFTER_COMMIT 이벤트',
              text: '주문 트랜잭션이 커밋된 이후에만 Kafka 이벤트가 발행되도록 분리해 롤백 주문의 후속 처리를 차단했습니다.',
            },
          ],
        },
      ],
    },
    {
      number: '04',
      id: 'decision',
      title: 'Decision',
      navTitle: '핵심 의사결정',
      navSubtitle: '기술 선택과 책임 분리',
      lead: '포인트 정합성과 이벤트 신뢰성을 기준으로 처리 경계를 나눴습니다.',
      content: [
        {
          type: 'tabs',
          tabs: [
            {
              id: 'lock-strategy',
              label: 'Redis 분산락 + DB 비관락',
              title: '분산 환경 직렬화와 트랜잭션 내부 검증을 함께 사용했습니다.',
              text: 'Redis 분산락은 여러 인스턴스로 들어오는 동일 사용자 주문 요청을 먼저 직렬화합니다.\nDB 비관락은 실제 포인트 변경 트랜잭션 안에서 잔액과 거래 이력을 다시 검증하는 기준으로 사용했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: 'Redis 분산락', text: '사용자 단위 요청을 먼저 묶어 같은 사용자의 주문이 동시에 통과하지 않도록 했습니다.' },
                  { label: 'DB 비관락', text: '잔액 차감, 충전, 취소처럼 같은 포인트 row를 변경하는 흐름에서 최종 정합성을 확인했습니다.' },
                  { label: '적용 기준', text: '주문 생성은 분산락과 DB 비관락을 함께 사용하고,\n충전과 취소는 DB 비관락 중심으로 처리했습니다.' },
                ],
              },
              callout: '분산락은 진입 순서를 제어하고, DB 락은 트랜잭션 내부의 포인트 정합성을 확인하는 역할로 나눴습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'facade-service',
              label: 'Facade / Service 책임 분리',
              title: '락 책임과 주문 트랜잭션 책임을 분리했습니다.',
              text: 'Facade는 Redis 분산락의 획득과 해제를 담당하고,\nService는 주문 생성과 포인트 변경 트랜잭션을 담당하도록 나눴습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: 'Facade', text: '분산락 키 생성, 락 획득, Service 호출, 락 해제 경계를 담당했습니다.' },
                  { label: 'Service', text: '포인트 잔액 검증, 차감, 거래 이력 저장, 주문 저장을 하나의 DB 처리 흐름으로 관리했습니다.' },
                  { label: '경계', text: 'DB 커밋 이전에 락이 풀리지 않도록 락과 트랜잭션의 책임을 분리해 관리했습니다.' },
                ],
              },
              callout: '락과 트랜잭션을 같은 메서드에 섞지 않고, 실패 위치를 추적하기 쉬운 책임 구조로 나눴습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'after-commit',
              label: 'AFTER_COMMIT 이벤트 발행',
              title: 'DB 커밋 이후에만 Kafka 이벤트가 발행되도록 분리했습니다.',
              text: 'OrderService에서는 Kafka를 직접 호출하지 않고 내부 이벤트만 발행했습니다.\nKafka Producer 호출은 AFTER_COMMIT 리스너에서 수행되도록 분리했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '커밋 이전', text: '주문 저장과 포인트 차감은 DB 트랜잭션 안에서 처리했습니다.' },
                  { label: '커밋 이후', text: '커밋이 완료된 주문만 Kafka 이벤트 발행 대상으로 넘겼습니다.' },
                  { label: '롤백 주문 차단', text: 'DB에서 롤백된 주문은 인기 메뉴 집계나 후속 처리로 전달되지 않도록 했습니다.' },
                ],
              },
              callout: 'Kafka와 DB를 하나의 트랜잭션으로 묶지 않고, DB 커밋 이후 후속 이벤트가 실행되도록 경계를 분리했습니다.',
              calloutTone: 'soft',
            },
          ],
        },
      ],
    },
    {
      number: '05',
      id: 'implementation',
      title: 'Implementation',
      navTitle: '구현 포인트',
      navSubtitle: '주문과 이벤트 처리',
      lead: '주문 처리, 포인트 변경, Kafka 후속 처리를 각각의 책임으로 구현했습니다.',
      content: [
        {
          type: 'tabs',
          tabs: [
            {
              id: 'order-concurrency',
              label: '주문 동시성 처리',
              title: '동일 사용자 주문 요청을 사용자 단위로 직렬화했습니다.',
              text: '주문 요청은 Facade에서 사용자 기준 Redis 분산락을 먼저 획득한 뒤\nService 트랜잭션으로 진입하도록 구성했습니다.',
              flow: ['주문 요청', 'lock:order:{userId}', 'Redis 분산락 획득', 'OrderService 호출', 'DB 비관락 조회', '잔액 검증', '주문 저장', '락 해제'],
              cards: {
                columns: 3,
                items: [
                  { label: '락 키', text: '동일 사용자의 주문 요청이 같은 락 키를 바라보도록 userId 기반 키를 사용했습니다.' },
                  { label: '트랜잭션 진입', text: '락 획득 이후에만 주문 Service를 호출해 포인트 변경 흐름이 순차적으로 실행되게 했습니다.' },
                  { label: '실패 처리', text: '잔액 부족 주문은 저장되지 않고 거절되며, 포인트 잔액이 음수로 내려가지 않도록 검증했습니다.' },
                ],
              },
            },
            {
              id: 'point-flow',
              label: '포인트 변경 흐름',
              title: '주문, 충전, 취소가 같은 잔액 기준을 사용하도록 처리했습니다.',
              text: '포인트 잔액을 변경하는 기능은 거래 이력과 잔액이 함께 맞는지 확인하는 흐름으로 구성했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '주문', text: '잔액 확인, 포인트 차감, 거래 이력 저장, 주문 저장을 같은 처리 흐름에서 관리했습니다.' },
                  { label: '충전', text: '동일 계정 충전 요청이 동시에 들어와도 기준 잔액에 요청 수만큼 누락 없이 반영되도록 검증했습니다.' },
                  { label: '취소', text: '주문 취소 시 포인트 복구와 거래 이력이 함께 맞도록 DB 비관락 기준으로 처리했습니다.' },
                ],
              },
              callout: '포인트는 단순 숫자 변경이 아니라 잔액, 거래 이력, 주문 상태가 함께 맞아야 하는 도메인으로 다뤘습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'kafka-processing',
              label: 'Kafka 후속 처리',
              title: '커밋된 주문만 Kafka 후속 처리로 이어지도록 구성했습니다.',
              text: 'Kafka Consumer는 커밋 이후 발행된 주문 이벤트를 받아\n주문 후속 처리와 Redis 인기 메뉴 카운트를 갱신합니다.',
              cards: {
                columns: 3,
                items: [
                  { label: 'Producer 경계', text: 'OrderService 내부에서 Kafka를 직접 호출하지 않고 AFTER_COMMIT 리스너에서 발행했습니다.' },
                  { label: 'Consumer 처리', text: '커밋된 주문 이벤트를 기준으로 주문 후속 처리와 Redis 인기 메뉴 카운트를 갱신했습니다.' },
                  { label: '재시도 / DLT', text: '반복 실패 메시지는 재시도 이후 DLT로 이동하도록 구성해 실패 메시지를 추적할 수 있게 했습니다.' },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      number: '06',
      id: 'result',
      title: 'Verification Result',
      navTitle: '검증 결과',
      navSubtitle: '동시 요청과 이벤트 검증',
      lead: '동일 조건의 동시 요청과 이벤트 처리 결과로 설계가 동작하는지 확인했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '포화 지점을 찾는 테스트가 아니라, 분산락, 비관락, Kafka 이벤트 발행 경계가 필요한 순간에 실제로 동작하는지를 확인했습니다.',
            '로컬 Docker 환경에서 Redis, Kafka, MySQL을 실행하고, k6 시나리오로 동시 요청과 후속 처리 결과를 검증했습니다.',
          ],
        },
        {
          type: 'metrics',
          label: '100 CONCURRENT ORDERS',
          items: [
            { label: '초기 잔액', value: '9,000P', tone: 'dark' },
            { label: '주문 금액', value: '3,000P' },
            { label: '동시 요청', value: '100건' },
            { label: '성공', value: '3건', tone: 'primary' },
            { label: '거절', value: '97건' },
            { label: '최종 잔액', value: '0P', tone: 'primary' },
          ],
        },
        {
          type: 'metrics',
          label: '50 CONCURRENT CHARGES',
          items: [
            { label: '충전 금액', value: '1,000P' },
            { label: '동시 요청', value: '50건' },
            { label: '반영 금액', value: '+50,000P', tone: 'primary' },
          ],
        },
        {
          type: 'metrics',
          label: 'KAFKA EVENT FLOW',
          items: [
            { label: '주문 실행', value: '60건', tone: 'dark' },
            { label: 'Redis 카운트', value: '+60', tone: 'primary' },
            { label: '롤백 주문', value: '후속 처리 차단' },
          ],
        },
        {
          type: 'cards',
          label: '검증 결과 해석',
          columns: 3,
          items: [
            {
              label: '분산락 검증',
              text: '9,000P 잔액에서 3,000P 주문 100건을 동시에 요청했을 때\n정확히 3건만 성공하고 최종 잔액이 0P로 유지되는지 확인했습니다.',
            },
            {
              label: '비관락 검증',
              text: '동일 계정에 1,000P 충전 요청 50건을 동시에 실행해\n기준 잔액에 50,000P가 누락 없이 반영되는지 확인했습니다.',
            },
            {
              label: 'Kafka 경계 검증',
              text: '커밋된 주문 이벤트만 후속 처리로 이어지고,\nRedis 인기 메뉴 카운트가 주문 수와 맞게 증가하는지 확인했습니다.',
            },
          ],
        },
      ],
    },
  ],
};

caseStudies.readys7 = {
  projectLabel: "Ready's7",
  description:
    'Redis Cache로 통합 검색 반복 조회 비용을 줄이고, 데이터 변경 시 캐시 제거 기준을 설계한 백엔드 Case Study입니다.',
  sections: [
    {
      number: '01',
      id: 'overview',
      title: 'Overview',
      navTitle: '개요',
      navSubtitle: '검색 캐시 설계',
      lead: '반복 검색 비용을 Redis Cache로 줄이고, 데이터 변경 시 결과 정합성을 맞췄습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '통합 검색은 프로젝트, 카테고리, 스킬, 개발자 데이터를 함께 조회하기 때문에 같은 키워드가 반복될수록 동일한 DB 조회 비용이 계속 발생했습니다.',
            'Redis Cache로 반복 검색 비용을 줄이고, 데이터 변경 경로에서 검색 캐시를 제거해 오래된 결과가 남지 않도록 구성했습니다.',
          ],
        },
        {
          type: 'facts',
          items: [
            { label: 'ROLE', value: 'Backend' },
            { label: 'TYPE', value: 'Team Project' },
            { label: 'PERIOD', value: '2026.03 - 2026.04' },
            { label: 'DOMAIN', value: '통합 검색, 인증/인가, 고객, 관리자' },
          ],
        },
        {
          type: 'cards',
          label: 'IMPLEMENTED SCOPE',
          columns: 3,
          items: [
            {
              label: '통합 검색 캐시',
              text: '프로젝트, 카테고리, 스킬, 개발자 데이터를 함께 조회하는 검색 결과를 Redis Cache로 저장했습니다.',
            },
            {
              label: '캐시 키와 TTL',
              text: 'keyword, page, size를 캐시 키에 포함해 페이지별 결과가 섞이지 않게 하고 TTL은 5분으로 설정했습니다.',
            },
            {
              label: '변경 경로 캐시 제거',
              text: '데이터 생성, 수정, 삭제 경로에서 검색 캐시를 제거해 오래된 결과가 남지 않도록 처리했습니다.',
            },
          ],
        },
      ],
    },
    {
      number: '02',
      id: 'problem',
      title: 'Problem',
      navTitle: '검색 문제',
      navSubtitle: '반복 조회와 오래된 결과',
      lead: '반복 검색은 느려지고, 데이터 변경 후에는 오래된 결과가 남을 수 있었습니다.',
      content: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: '반복 검색 비용',
              text: '같은 키워드가 반복될 때마다 프로젝트, 카테고리, 스킬, 개발자 조회 비용이 다시 발생했습니다.',
            },
            {
              label: '페이지 결과 분리',
              text: '키워드가 같아도 page와 size가 다르면 서로 다른 결과이므로 캐시 키에서 구분해야 했습니다.',
            },
            {
              label: '오래된 검색 결과',
              text: '프로젝트 데이터가 변경된 뒤 기존 캐시가 남아 있으면 사용자가 오래된 검색 결과를 받을 수 있었습니다.',
            },
          ],
        },
        {
          type: 'callout',
          text: '검색 속도만 줄이는 것이 아니라, 반복 조회 비용과 데이터 변경 후 결과 정합성을 함께 고려해야 했습니다.',
        },
      ],
    },
    {
      number: '03',
      id: 'approach',
      title: 'Approach',
      navTitle: '접근 방식',
      navSubtitle: '키와 제거 전략',
      lead: '검색 조건별 캐시 키와 변경 경로의 캐시 제거 전략을 함께 설계했습니다.',
      content: [
        {
          type: 'approach',
          steps: ['검색 요청', '캐시 키 생성', 'Cache Hit 확인', 'DB 조회', '결과 캐싱', '데이터 변경', 'Cache Evict'],
          items: [
            {
              label: 'Redis Cache 적용',
              text: '같은 검색 조건이 반복될 때 DB 조회를 다시 수행하지 않고 캐시된 결과를 반환하도록 구성했습니다.',
            },
            {
              label: 'keyword + page + size',
              text: '검색어와 페이지 조건을 캐시 키에 포함해 같은 키워드라도 페이지별 결과가 섞이지 않도록 했습니다.',
              tone: 'primary',
            },
            {
              label: '변경 경로 Cache Evict',
              text: '생성, 수정, 삭제 경로에서 검색 캐시를 제거해 변경된 데이터가 오래된 캐시에 가려지지 않도록 했습니다.',
            },
          ],
        },
      ],
    },
    {
      number: '04',
      id: 'decision',
      title: 'Decision',
      navTitle: '핵심 의사결정',
      navSubtitle: '캐시 기준과 무효화',
      lead: '반복 조회 비용과 결과 정합성을 기준으로 캐시 전략을 선택했습니다.',
      content: [
        {
          type: 'tabs',
          tabs: [
            {
              id: 'redis-cache',
              label: 'Redis Cache 선택',
              title: '반복 검색 결과를 여러 인스턴스가 공유할 수 있도록 Redis Cache를 선택했습니다.',
              text: '검색 API는 같은 키워드가 반복될 가능성이 높고, 여러 서버 인스턴스가 같은 캐시를 바라봐야 합니다.\n따라서 Local Cache가 아니라 Redis Cache를 사용했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '반복 조회 감소', text: '같은 조건의 검색 요청은 DB 조회 대신 캐시 결과로 응답하도록 했습니다.' },
                  { label: '공유 캐시', text: '서버 인스턴스가 늘어나도 동일한 Redis 캐시를 바라볼 수 있게 했습니다.' },
                  { label: 'TTL 5분', text: '검색 결과가 장시간 남지 않도록 TTL을 5분으로 두었습니다.' },
                ],
              },
              callout: '캐시는 속도 개선 수단이지만, 검색 결과가 오래 남지 않도록 만료 기준도 함께 설정했습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'cache-key',
              label: '캐시 키 설계',
              title: 'keyword, page, size를 캐시 키에 포함했습니다.',
              text: '같은 키워드라도 페이지 번호와 페이지 크기가 다르면 결과가 달라집니다.\n캐시 키에 keyword, page, size를 함께 넣어 페이지별 결과가 섞이지 않도록 했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: 'keyword', text: '검색어가 달라지면 서로 다른 캐시 항목으로 분리했습니다.' },
                  { label: 'page', text: '같은 검색어라도 페이지 번호가 다르면 다른 결과로 처리했습니다.' },
                  { label: 'size', text: '페이지 크기 변경으로 결과 범위가 달라지는 경우도 캐시 키에서 구분했습니다.' },
                ],
              },
              callout: '캐시 키는 검색 조건의 일부가 아니라, 응답 결과를 구분하는 기준으로 설계했습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'all-entries',
              label: 'allEntries=true 선택 이유',
              title: '특정 키 역추적 대신 검색 캐시 전체 제거를 선택했습니다.',
              text: '프로젝트 데이터 변경이 어떤 검색어와 페이지에 영향을 주는지 역추적하려면 키 관리 복잡도가 커집니다.\n데이터 변경 빈도보다 검색 반복 비용 절감이 더 중요하다고 판단해 변경 경로에서는 검색 캐시 전체를 제거했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '키 역추적 비용', text: '변경된 프로젝트가 포함될 수 있는 검색어와 페이지 조합을 추적하는 비용이 컸습니다.' },
                  { label: '전체 제거', text: '@CacheEvict(allEntries=true)로 검색 캐시를 제거해 오래된 결과가 남지 않도록 했습니다.' },
                  { label: '운영 기준', text: '캐시 적중률보다 데이터 변경 후 결과 신뢰성을 우선한 선택이었습니다.' },
                ],
              },
              callout: '특정 키를 추적하는 대신, 변경 경로에서 오래된 결과가 남지 않도록 검색 캐시 전체 제거를 선택했습니다.',
              calloutTone: 'soft',
            },
          ],
        },
      ],
    },
    {
      number: '05',
      id: 'implementation',
      title: 'Implementation',
      navTitle: '구현 포인트',
      navSubtitle: '검색 캐시와 쿼리',
      lead: '검색 캐시 적용, 캐시 제거, DTO Projection 쿼리 오류를 구현 단계에서 정리했습니다.',
      content: [
        {
          type: 'tabs',
          tabs: [
            {
              id: 'cacheable',
              label: '@Cacheable 검색 캐시',
              title: '통합 검색 결과를 검색 조건 단위로 캐싱했습니다.',
              text: '검색 요청이 들어오면 keyword, page, size 기반 캐시 키를 만들고, 같은 조건의 반복 요청은 캐시 결과로 응답하도록 구성했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '검색 대상', text: '프로젝트, 카테고리, 스킬, 개발자 데이터를 함께 조회하는 통합 검색에 캐시를 적용했습니다.' },
                  { label: '캐시 키', text: 'keyword, page, size를 기준으로 캐시 항목을 분리했습니다.' },
                  { label: 'TTL', text: '검색 결과는 5분 동안 유지되도록 설정했습니다.' },
                ],
              },
            },
            {
              id: 'cache-evict',
              label: '@CacheEvict 캐시 제거',
              title: '데이터 변경 경로에서 검색 캐시를 제거했습니다.',
              text: '프로젝트 생성, 수정, 삭제처럼 검색 결과에 영향을 주는 경로에서 검색 캐시를 제거해 오래된 결과가 남지 않도록 했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '생성', text: '새 프로젝트가 검색 결과에 포함될 수 있으므로 변경 이후 캐시를 제거했습니다.' },
                  { label: '수정', text: '제목, 카테고리, 스킬 등 검색 대상 필드가 바뀌는 경우를 고려했습니다.' },
                  { label: '삭제', text: '삭제된 데이터가 캐시 결과에 남지 않도록 검색 캐시를 제거했습니다.' },
                ],
              },
            },
            {
              id: 'dto-projection',
              label: 'DTO Projection join 오류 해결',
              title: 'DTO Projection과 fetchJoin 충돌을 일반 join으로 정리했습니다.',
              text: '검색 결과를 DTO로 바로 조회하는 과정에서 fetchJoin이 맞지 않는 구간이 있어 일반 join으로 변경했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: 'DTO Projection', text: '검색 응답에 필요한 필드만 DTO로 조회하도록 구성했습니다.' },
                  { label: 'fetchJoin 오류', text: '엔티티 그래프 로딩 목적의 fetchJoin이 DTO 조회와 맞지 않는 구간을 확인했습니다.' },
                  { label: '일반 join', text: '필요한 조건과 필드 조회만 남기고 일반 join으로 검색 쿼리를 정리했습니다.' },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      number: '06',
      id: 'result',
      title: 'Performance Result',
      navTitle: '성능 검증',
      navSubtitle: 'k6 비교 결과',
      lead: '로컬 Docker 환경에서 같은 최대 100 VU 조건으로 캐시 적용 전후를 비교했습니다.',
      content: [
        {
          type: 'metrics',
          label: 'k6 RAMP-UP SCENARIO',
          items: [
            { label: '데이터', value: '50,009건', tone: 'dark' },
            { label: '최대 VU', value: '100' },
            { label: '환경', value: 'Local Docker' },
          ],
        },
        {
          type: 'metrics',
          label: 'CACHE BEFORE / AFTER',
          items: [
            { label: '평균 응답 시간', value: '1,940ms → 3.73ms', tone: 'primary' },
            { label: '처리량', value: '16.19 TPS → 46.68 TPS', tone: 'primary' },
          ],
        },
        {
          type: 'callout',
          text: '같은 최대 100 VU 조건에서 반복 검색 비용을 비교했고, 데이터 변경 시에는 캐시를 제거해 오래된 결과가 남지 않도록 구성했습니다.',
        },
      ],
    },
  ],
};
