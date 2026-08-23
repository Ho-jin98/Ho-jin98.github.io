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
    image?: {
      src: string;
      alt: string;
    };
    cards?: CaseStudyBlock[];
    facts?: CaseStudyFact[];
  }[];
  supportCards?: {
    title: string;
    text?: string;
    image?: {
      src: string;
      alt: string;
    };
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
      type: 'overviewDashboard';
      performance: {
        title: string;
        before: {
          title: string;
          text: string;
        };
        after: {
          title: string;
          text: string;
        };
        metrics: {
          label: string;
          before: string;
          after: string;
          tone?: 'primary' | 'dark';
        }[];
      };
      freshness: {
        title: string;
        before: string;
        after: string[];
        result: string;
        items: CaseStudyFact[];
      };
    }
  | {
      type: 'cacheDesign';
      flow: {
        title: string;
        entry: string[];
        hit: string[];
        miss: string[];
      };
      why: {
        title: string;
        items: string[];
      };
      keyRules: {
        title: string;
        items: CaseStudyBlock[];
      };
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
      type: 'stepFlow';
      label: string;
      steps: string[];
    }
  | {
      type: 'summaryBox';
      label: string;
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
      label?: string;
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
      type: 'proofs';
      label?: string;
      items: {
        title: string;
        text: string;
        image: {
          src: string;
          alt: string;
        };
        items: CaseStudyFact[];
      }[];
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
    'Redis 분산락, DB 비관락, AFTER_COMMIT Kafka 발행, Consumer DLT, k6 검증으로 커피 주문 흐름의 정합성과 이벤트 경계를 확인한 백엔드 Case Study입니다.',
  sections: [
    {
      number: '01',
      id: 'overview',
      title: 'Overview',
      navTitle: '개요',
      navSubtitle: '정합성 검증 요약',
      lead: 'Redis와 Kafka를 커피 주문 흐름에 적용해\n주문 정합성과 후속 처리 경계를 분리했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '커피 주문 시스템에서 동일 사용자의 동시 주문, 포인트 충전, 주문 완료 후 인기 메뉴 집계 흐름을 분리해 구현했습니다.',
            '동일 사용자의 주문 요청은 Redis 분산락으로 먼저 직렬화하고, 실제 포인트 변경은 DB 비관락으로 다시 확인했습니다.',
            '주문 저장 트랜잭션이 커밋된 이후에만 Kafka 이벤트가 발행되도록 분리해, 롤백된 주문이 후속 처리로 넘어가지 않도록 구성했습니다.',
          ],
        },
        {
          type: 'cards',
          label: '핵심 구현 결과',
          columns: 3,
          items: [
            {
              label: '주문 정합성',
              text: '동일 사용자의 동시 주문 요청이 잔액을 초과해 성공하지 않도록 처리했습니다.\n\n- 사용자 단위 Redis 분산락으로 주문 진입 순서 제어\n- 주문 트랜잭션 내부에서 DB 기준 잔액 재확인\n- 잔액 부족 주문은 거절하고 성공 가능한 주문만 저장\n\n결과: 100건 요청 / 3건 성공 / 97건 거절 / 최종 잔액 0P',
              tone: 'primary',
            },
            {
              label: '포인트 변경 정합성',
              text: '충전, 주문, 취소가 같은 포인트 기준과 거래 이력을 사용하도록 처리했습니다.\n\n- 포인트 변경은 User point row 기준으로 처리\n- PointHistory와 최종 잔액이 함께 맞도록 관리\n- 동시 충전 요청에서도 기대 잔액과 실제 잔액 일치 확인\n\n결과: 50건 충전 / +50,000P 반영 / deadlock 0건',
            },
            {
              label: 'Kafka 후속 처리 경계',
              text: '주문 트랜잭션이 커밋된 이후에만 Kafka 이벤트가 발행되도록 분리했습니다.\n\n- OrderService 내부에서는 Kafka를 직접 호출하지 않음\n- AFTER_COMMIT 리스너에서 Kafka Producer 호출\n- Consumer는 커밋된 주문 이벤트 기준으로 인기 메뉴 카운트 갱신\n\n결과: 주문 이벤트 60건 / Redis 카운트 +60 / 실패 메시지 DLT 격리',
            },
          ],
        },
        {
          type: 'cards',
          label: '최종 처리 구조',
          columns: 3,
          items: [
            {
              label: 'Redis 분산락',
              text: '요청 진입 제어\n\n동일 사용자 주문 요청이 동시에 트랜잭션에 진입하지 않도록 앞단에서 순서를 제어했습니다.',
            },
            {
              label: 'DB 비관락',
              text: '포인트 변경 정합성 확인\n\n실제 포인트 잔액과 거래 이력의 최종 정합성을 트랜잭션 내부에서 확인했습니다.',
              tone: 'primary',
            },
            {
              label: 'AFTER_COMMIT + Kafka',
              text: '커밋된 주문만 후속 처리\n\nDB 커밋 이후에만 주문 이벤트를 발행해 커밋된 주문만 후속 처리로 연결했습니다.',
            },
          ],
        },
      ],
    },
    {
      number: '02',
      id: 'problem',
      title: 'Problem Context',
      navTitle: '문제 배경',
      navSubtitle: '다중 인스턴스와 포인트 경합',
      lead: '다중 인스턴스 상황을 가정하면\n단순 주문 API만으로는 정합성을 설명하기 어려웠습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '커피 주문 시스템은 단순 CRUD처럼 보이지만,\n실제로는 동일 사용자의 포인트 잔액을 주문·충전·취소가 함께 변경합니다.',
            '단일 서버에서는 애플리케이션 메모리 기준으로 요청 순서를 제어할 수 있지만,\n다중 인스턴스 상황에서는 같은 사용자의 요청이 서로 다른 인스턴스로 분산될 수 있습니다.',
            '이 경우 애플리케이션 내부 동기화만으로는 주문 진입 순서를 보장하기 어렵고,\n최종 잔액과 거래 이력은 DB 트랜잭션 안에서 다시 검증되어야 합니다.',
            '또한 주문 저장이 롤백되었는데 Kafka 이벤트가 먼저 발행되면,\n실제로 존재하지 않는 주문이 인기 메뉴 집계나 후속 처리 대상으로 넘어갈 수 있습니다.',
          ],
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: '동일 사용자 주문 경합',
              text: '같은 사용자의 주문 요청이 동시에 들어오면,\n동일 잔액을 기준으로 여러 주문이 성공할 수 있었습니다.\n\n검증 기준\n잔액을 초과한 주문은 실패하고,\n최종 잔액은 0P 아래로 내려가지 않아야 했습니다.',
            },
            {
              label: '공통 포인트 잔액 변경',
              text: '주문·충전·취소는 모두 같은 User point row와\nPointHistory를 기준으로 잔액과 거래 이력을 변경합니다.\n\n검증 기준\n요청이 동시에 들어와도 기대 잔액과 실제 잔액이 일치하고,\n거래 이력이 누락되지 않아야 했습니다.',
            },
            {
              label: '트랜잭션과 이벤트 시점',
              text: 'DB 커밋 전에 Kafka 이벤트가 발행되면,\n롤백된 주문이 후속 처리 대상으로 넘어갈 수 있었습니다.\n\n검증 기준\n커밋된 주문만 Kafka 후속 처리로 이어지고,\n롤백된 주문은 인기 메뉴 집계나 Consumer 처리 대상으로 넘어가지 않아야 했습니다.',
            },
          ],
        },
        {
          type: 'callout',
          text: '핵심은 Redis와 Kafka 사용 자체가 아니라, 요청 진입 순서, 포인트 변경 정합성, 이벤트 발행 시점을 각각 다른 기준으로 분리해 검증하는 것이었습니다.',
        },
      ],
    },
    {
      number: '03',
      id: 'boundary',
      title: 'Flow Split Design',
      navTitle: '흐름 분리 설계',
      navSubtitle: '락, 트랜잭션, 이벤트 시점',
      lead: '요청 진입, 포인트 변경, 이벤트 발행 시점을\n서로 다른 경계로 분리했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '동일 사용자의 주문 요청이 동시에 들어와도 OrderService의 주문 처리 트랜잭션에 동시에 진입하지 않도록 Redis 분산락으로 먼저 제어했습니다.',
            '실제 포인트 잔액 변경은 DB 트랜잭션 안에서 다시 검증하고, Kafka 이벤트는 DB 커밋 이후에만 발행되도록 분리했습니다.',
          ],
        },
        {
          type: 'flowGroups',
          groups: [
            {
              label: '요청 진입 경계',
              title: 'Redis 분산락',
              items: ['주문 요청', 'lock:order:{userId}', 'OrderService 진입'],
            },
            {
              label: 'DB 정합성 경계',
              title: 'DB 비관락',
              items: ['User row 잠금', '잔액 검증', '주문/포인트/이력 저장', 'Commit'],
            },
            {
              label: '이벤트 발행 경계',
              title: 'AFTER_COMMIT + Kafka',
              items: ['Commit 완료', 'Kafka 이벤트 발행', 'Consumer 후속 처리'],
            },
          ],
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: 'Redis 분산락',
              text: '같은 사용자의 주문 요청이 여러 인스턴스로 동시에 들어와도\n주문 트랜잭션에 함께 진입하지 않도록 앞단에서 순서를 제어했습니다.',
            },
            {
              label: 'DB 비관락',
              text: 'Redis 락 이후에도 실제 잔액 변경은 DB에서 일어나기 때문에\nUser 포인트 row를 비관락으로 잠그고 최종 잔액을 다시 검증했습니다.',
              tone: 'primary',
            },
            {
              label: 'AFTER_COMMIT 이벤트',
              text: '주문 저장이 롤백된 경우 Kafka 후속 처리로 넘어가지 않도록\nDB 커밋이 끝난 주문만 이벤트 발행 대상으로 분리했습니다.',
            },
          ],
        },
        {
          type: 'callout',
          text: 'Redis 분산락은 요청 진입을 제어하고, DB 비관락은 실제 잔액 변경의 최종 정합성을 검증합니다.',
        },
      ],
    },
    {
      number: '04',
      id: 'consistency',
      title: 'Order And Point Consistency',
      navTitle: '주문/포인트 정합성',
      navSubtitle: '분산락과 DB 비관락',
      lead: '포인트는 잔액, 거래 이력, 주문 상태가\n함께 일관되어야 하는 도메인으로 다뤘습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '주문, 충전, 취소는 모두 같은 사용자 포인트 잔액을 변경합니다.',
            '따라서 단순히 숫자만 바꾸지 않고, 최종 잔액과 PointHistory, 주문 상태가 하나의 DB 처리 흐름 안에서 맞도록 구성했습니다.',
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              id: 'order-deduction',
              label: '주문 차감 기준',
              title: '주문 생성과 포인트 차감은 같은 DB 트랜잭션에서 처리했습니다.',
              text: '주문 요청이 트랜잭션에 들어오면 잔액 확인, 포인트 차감, 거래 이력 저장, 주문 저장을 같은 처리 흐름에서 관리했습니다.\n\n잔액이 부족한 주문은 저장하지 않고, 포인트 잔액이 변경되지 않도록 처리했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '잔액 확인', text: '주문 금액을 기준으로\n현재 포인트 잔액이 충분한지 먼저 확인했습니다.' },
                  { label: '차감과 저장', text: '포인트 차감, 거래 이력 저장, 주문 저장을\n하나의 트랜잭션에서 처리했습니다.', tone: 'primary' },
                  { label: '잔액 부족 처리', text: '잔액이 부족한 주문은 저장하지 않고,\n포인트 잔액이 변경되지 않도록 처리했습니다.' },
                ],
              },
            },
            {
              id: 'charge-cancel',
              label: '충전 / 취소 기준',
              title: '충전과 취소도 같은 포인트 row와 이력 기준으로 처리했습니다.',
              text: '충전은 동일 계정의 포인트 row를 기준으로 충전 금액과 최종 잔액이 일치하는지 확인했습니다.\n\n취소는 주문 상태 변경과 포인트 복구, 거래 이력이 함께 남도록 처리해 포인트만 복구되고 이력이 누락되는 상태를 막았습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '충전 반영', text: '동일 계정의 포인트 row 기준으로 충전 금액을 반영했습니다.' },
                  { label: '동시 충전 검증', text: '동시 충전 요청에서도 기대 최종 잔액과 실제 최종 잔액이 일치하는지 확인했습니다.', tone: 'primary' },
                  { label: '취소 복구', text: '주문 취소 시 포인트 복구와 거래 이력이 함께 저장되도록 처리했습니다.' },
                ],
              },
            },
            {
              id: 'history-consistency',
              label: '거래 이력 정합성',
              title: '잔액 변경은 PointHistory로 추적 가능하게 남겼습니다.',
              text: '포인트는 잔액 숫자만 맞으면 끝나는 값이 아니라, 어떤 요청 때문에 변경됐는지 거래 이력으로 추적되어야 합니다.\n\n주문 차감, 충전, 취소는 모두 PointHistory 기준으로 남겨 최종 잔액과 변경 이력이 함께 맞도록 처리했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '주문 차감 이력', text: '주문 성공 시 포인트 차감과 주문 저장이 같은 흐름에서 기록됩니다.' },
                  { label: '충전 이력', text: '충전 요청은 잔액 증가와 함께 거래 이력으로 남겨 추적 가능하게 했습니다.' },
                  { label: '취소 이력', text: '주문 취소 시 포인트 복구와 취소 이력이 함께 남도록 처리했습니다.', tone: 'primary' },
                ],
              },
            },
          ],
        },
        {
          type: 'cards',
          label: '정합성 기준 요약',
          columns: 3,
          items: [
            {
              label: '잔액 음수 방지',
              text: '잔액이 부족한 주문은 저장하지 않고,\n포인트 잔액이 변경되지 않도록 처리했습니다.',
            },
            {
              label: '거래 이력 누락 방지',
              text: '포인트 변경은 PointHistory와 함께 기록했습니다.',
              tone: 'primary',
            },
            {
              label: '주문 상태 일치',
              text: '주문 저장, 포인트 차감, 거래 이력이\n같은 처리 흐름 안에서 맞도록 구성했습니다.',
            },
          ],
        },
      ],
    },
    {
      number: '05',
      id: 'kafka',
      title: 'Kafka Event Processing',
      navTitle: 'Kafka 이벤트 처리',
      navSubtitle: '커밋 이후 후속 처리',
      lead: '커밋된 주문만 Kafka 후속 처리로 이어지도록\n이벤트 발행 시점을 분리했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '주문 저장과 포인트 차감은 DB 트랜잭션 안에서 먼저 확정하고, Kafka 이벤트는 커밋 이후 AFTER_COMMIT 리스너에서 발행하도록 분리했습니다.',
            '이를 통해 롤백된 주문이 Consumer 후속 처리로 넘어가는 상황을 막고, 커밋된 주문만 이벤트 처리 대상이 되도록 구성했습니다.',
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              id: 'publish-boundary',
              label: '발행 시점',
              title: 'DB 커밋 이후에만 Kafka 이벤트가 발행되도록 분리했습니다.',
              text: 'OrderService 트랜잭션 안에서 Kafka를 직접 호출하면, DB 롤백 시 실제 주문은 없는데 Kafka 이벤트만 남을 수 있습니다.\n\n이를 막기 위해 OrderService에서는 내부 이벤트만 발행하고, Kafka Producer 호출은 AFTER_COMMIT 리스너에서 수행되도록 분리했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '커밋 이전 문제', text: '트랜잭션 안에서 Kafka를 직접 호출하면 롤백 주문도 이벤트로 남을 수 있습니다.' },
                  { label: 'AFTER_COMMIT 분리', text: 'DB 커밋이 끝난 주문만 Kafka Producer 호출 대상으로 분리했습니다.' },
                  { label: '롤백 주문 차단', text: 'DB에 저장되지 않은 주문은 Kafka 후속 처리로 넘어가지 않도록 분리했습니다.' },
                ],
              },
            },
            {
              id: 'consumer-processing',
              label: 'Consumer 처리',
              title: 'Consumer는 커밋된 주문 이벤트를 기준으로 후속 처리를 수행했습니다.',
              text: 'Consumer는 Kafka로 전달된 주문 이벤트를 받아 주문 상태 변경과 Redis 인기 메뉴 카운트 갱신을 처리했습니다.\n\n포인트 차감과 거래 이력 저장은 이미 OrderService 트랜잭션에서 끝난 상태이므로, Consumer는 주문 완료 후 필요한 부가 처리에 집중하도록 역할을 분리했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '주문 상태 변경', text: '커밋된 주문 이벤트를 기준으로 주문 후속 처리를 수행하도록 Consumer 책임을 분리했습니다.' },
                  { label: '인기 메뉴 카운트', text: '주문 이벤트의 menuId를 기준으로 Redis Sorted Set에 인기 메뉴 카운트를 누적했습니다.' },
                  { label: '트랜잭션 영향 분리', text: 'Consumer 처리 실패가 주문 저장과 포인트 차감 트랜잭션에 직접 영향을 주지 않도록 분리했습니다.' },
                ],
              },
              supportCards: [
                {
                  title: 'Kafka UI 화면',
                  text: 'order-group Consumer가 order 토픽 메시지를 처리한 화면입니다.',
                  image: { src: '/k-server-images/kafka-order-consumer.png', alt: 'Kafka order-group Consumer 상태 원본 캡처' },
                  items: [
                    { label: 'Consumer group', value: 'order-group' },
                    { label: 'Consumer Lag', value: '0' },
                  ],
                },
              ],
            },
            {
              id: 'retry-dlt',
              label: '실패 범위와 보완',
              title: 'Consumer 실패는 DLT로 격리하고, 발행 신뢰성은 Outbox 개선 방향으로 정리했습니다.',
              text: '현재 구현에서는 Consumer 처리 실패에 FixedBackOff 재시도와 DLT를 적용했습니다.\n\n반복 실패한 메시지는 정상 처리처럼 넘기지 않고 order-dlt 토픽으로 분리해, 나중에 실패 원인을 추적할 수 있도록 했습니다.\n\n다만 DB 커밋 이후 Kafka Producer 발행 자체가 실패하는 상황까지 현재 구조가 강하게 보장하는 것은 아닙니다. 운영 수준의 발행 신뢰성이 필요하다면 Outbox Pattern으로 주문 이벤트를 DB에 먼저 저장하고, 별도 Publisher가 Kafka 발행을 재시도하는 구조로 확장할 수 있습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: 'Consumer Retry / DLT', text: 'Consumer 처리 중 일시적 오류가 발생하면 재시도하고, 반복 실패한 메시지는 DLT로 분리했습니다.' },
                  { label: '현재 구조의 한계', text: 'AFTER_COMMIT은 롤백 주문 발행은 막지만, DB 커밋 이후 발행 신뢰성까지 강하게 보장하지는 않습니다.' },
                  { label: '개선 방향', text: '발행 신뢰성이 더 필요하다면 Outbox Pattern으로 이벤트 저장과 Kafka 발행을 분리할 수 있습니다.' },
                ],
              },
              supportCards: [
                {
                  title: 'Kafka UI 화면',
                  text: 'Consumer 처리 실패 메시지가 order-dlt 토픽으로 분리된 화면입니다.',
                  image: { src: '/k-server-images/kafka-order-dlt.png', alt: 'Kafka order-dlt 실패 메시지 원본 캡처' },
                  items: [
                    { label: 'Topic', value: 'order-dlt' },
                    { label: '범위', value: 'Consumer 실패 격리' },
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
      id: 'verification',
      title: 'Verification Scenario',
      navTitle: '검증 시나리오',
      navSubtitle: 'k6 조건과 실행 결과',
      lead: '동일 조건의 k6 시나리오로\n동시 요청과 이벤트 처리 결과를 확인했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '검증의 목적은 최대 처리량 측정이 아니라, 분산락, 비관락, Kafka 이벤트 발행 경계가 필요한 순간에 실제로 동작하는지 확인하는 것이었습니다.',
            '로컬 Docker 환경에서 Redis, Kafka, MySQL을 실행하고, k6 시나리오로 동시 요청과 후속 처리 결과가 의도대로 이어지는지 확인했습니다.',
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              id: 'order-verification',
              label: '동시 주문 검증',
              title: '동일 사용자 주문 100건에서 3건만 성공하는지 확인했습니다.',
              text: 'Redis 분산락과 DB 잔액 검증이 함께 적용되어, 잔액을 초과한 주문이 성공하지 않는 것을 확인했습니다.',
              supportCards: [
                {
                  title: 'k6 실행 결과 화면',
                  text: '동일 사용자 주문 100건 요청 결과를 보여주는 화면입니다.',
                  image: { src: '/k-server-images/distributed-lock-order-result.png', alt: 'k6 분산락 주문 동시성 검증 결과' },
                  items: [
                    { label: '요청', value: '100건' },
                    { label: '성공', value: '3건' },
                    { label: '잔액 부족', value: '97건' },
                    { label: '최종 잔액', value: '0P' },
                    { label: '핵심 판단', value: '초기 잔액 9,000P에서 3건만 성공하고 97건은 잔액 부족으로 차단되어 최종 잔액이 0P로 유지되었습니다.' },
                  ],
                },
              ],
            },
            {
              id: 'charge-verification',
              label: '포인트 충전 검증',
              title: '동일 계정 충전 요청 50건이 누락 없이 반영되는지 확인했습니다.',
              text: '동일 계정에 충전 요청 50건이 동시에 들어와도, User point row 기준으로 누락 없이 반영되는지 확인했습니다.',
              supportCards: [
                {
                  title: 'k6 실행 결과 화면',
                  text: '동일 계정 충전 요청 50건 처리 결과를 보여주는 화면입니다.',
                  image: { src: '/k-server-images/pessimistic-lock-charge-result.png', alt: 'k6 비관락 포인트 충전 검증 결과' },
                  items: [
                    { label: '요청', value: '50건' },
                    { label: '반영 금액', value: '+50,000P' },
                    { label: '최종 잔액', value: '1,679,000P' },
                    { label: 'deadlock', value: '0건' },
                    { label: '핵심 판단', value: '요청한 +50,000P가 최종 잔액에 그대로 반영되었고, 충전 실패와 deadlock 없이 처리되었습니다.' },
                  ],
                },
              ],
            },
            {
              id: 'kafka-verification',
              label: 'Kafka 이벤트 검증',
              title: '주문 이벤트 60건이 Kafka 후속 처리와 Redis 카운트로 이어지는지 확인했습니다.',
              text: '커밋된 주문 이벤트만 Kafka 후속 처리로 전달되고, Redis 인기 메뉴 카운트가 기대값과 동일하게 누적되는 것을 확인했습니다.',
              supportCards: [
                {
                  title: 'k6 실행 결과 화면',
                  text: '커밋된 주문 이벤트 처리 결과를 보여주는 화면입니다.',
                  image: { src: '/k-server-images/kafka-integrity-result.png', alt: 'k6 Kafka 이벤트 정합성 검증 결과' },
                  items: [
                    { label: '주문 이벤트', value: '60건' },
                    { label: 'Redis 카운트', value: '+60' },
                    { label: '메시지 유실', value: '0건' },
                    { label: 'Kafka order failed', value: '0건' },
                    { label: '핵심 판단', value: '커밋된 주문 이벤트 60건이 Kafka 후속 처리로 전달되고, Redis 인기 메뉴 카운트도 +60으로 반영되어 메시지 유실 없이 처리되었습니다.' },
                  ],
                },
                {
                  title: 'Redis UI 화면',
                  text: 'Kafka Consumer 처리 결과가 Redis Sorted Set score로 누적된 화면입니다.',
                  image: { src: '/k-server-images/redisinsight-menu-result.png', alt: 'Redis popular menus result Sorted Set 캡처' },
                  items: [
                    { label: 'Key', value: 'popular:menus:result' },
                    { label: 'Type', value: 'Sorted Set' },
                    { label: '대상', value: '인기 메뉴 카운트' },
                    { label: '반영', value: 'score 누적 확인' },
                  ],
                },
              ],
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
    '통합 검색 Redis Cache 적용으로 반복 DB 직접 조회를 줄이고, 데이터 변경 후 오래된 검색 결과가 남지 않도록 무효화 기준을 설계한 백엔드 Case Study입니다.',
  sections: [
    {
      number: '01',
      id: 'overview',
      title: 'Overview',
      navTitle: '개요',
      navSubtitle: '성능과 정합성 요약',
      lead: '반복 검색은 Redis Cache로 응답하고,\n데이터 변경 후 오래된 검색 결과는 제거했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '반복 검색 요청은 Redis Cache에서 먼저 응답하도록 구성했습니다.\n캐시에 없는 요청만 실제 검색 흐름으로 이어지게 분리하고, 캐시 미적용 v1과 Redis Cache 적용 v2를 k6로 비교했습니다.',
            '또한 프로젝트 데이터가 생성·수정·삭제될 때는 검색 캐시를 제거해,\n다음 검색 요청에서 최신 데이터를 다시 조회하도록 구성했습니다.',
          ],
        },
        {
          type: 'overviewDashboard',
          performance: {
            title: 'Redis Cache 적용 결과',
            before: {
              title: 'v1 캐시 미적용',
              text: 'DB 직접 조회 반복',
            },
            after: {
              title: 'v2 Redis Cache 적용',
              text: '동일 조건 요청은 캐시 응답',
            },
            metrics: [
              { label: '평균 응답 시간', before: '1.94s', after: '3.73ms', tone: 'primary' },
              { label: 'p95', before: '3.56s', after: '6.39ms' },
              { label: '처리량', before: '16.19 req/s', after: '46.68 req/s', tone: 'primary' },
            ],
          },
          freshness: {
            title: '오래된 검색 결과 방지',
            before: '데이터 변경 후에도 기존 검색 캐시가 먼저 반환될 수 있음',
            after: [
              '생성 / 수정 / 삭제 시 검색 캐시 제거',
              '다음 검색에서 최신 데이터 재조회 후 Redis 재적재',
            ],
            result: '오래된 검색 결과가 계속 반환되는 문제 방지',
            items: [
              { label: '무효화 대상', value: '검색 결과 캐시' },
              { label: '무효화 기준', value: '데이터 변경 경로' },
              { label: '목적', value: '오래된 검색 결과 방지' },
            ],
          },
        },
      ],
    },
    {
      number: '02',
      id: 'problem',
      title: 'Search Bottleneck',
      navTitle: '반복 검색 문제',
      navSubtitle: 'DB 직접 조회 반복',
      lead: '통합 검색은 같은 검색 조건의 요청이 반복돼도\n매번 검색 로직과 DB 조회를 다시 수행했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '통합 검색은 프로젝트, 카테고리, 스킬, 개발자 데이터를 함께 조회했습니다.\n캐시 적용 전에는 같은 검색 조건의 요청이 반복되어도, 매번 실제 검색 로직과 DB 조회 흐름으로 이어졌습니다.',
            '또한 프로젝트나 개발자 정보가 변경되면 기존 검색 결과가 오래된 상태로 남을 수 있어,\n반복 조회뿐 아니라 검색 결과의 최신성도 함께 고려해야 했습니다.',
          ],
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            { label: '반복 조회 발생', text: '같은 검색 조건 요청도 캐시 적용 전에는 매번 실제 검색 로직과 DB 조회 흐름으로 이어졌습니다.' },
            { label: '여러 도메인 동시 조회', text: '통합 검색 한 번에 프로젝트, 카테고리, 스킬, 개발자 데이터를 함께 조회했습니다.' },
            { label: '오래된 결과 위험', text: '프로젝트나 개발자 정보가 변경된 뒤에도 이전 검색 결과가 남아 있으면 최신 정보가 반영되지 않을 수 있었습니다.' },
          ],
        },
        {
          type: 'stepFlow',
          label: '캐시 적용 전 검색 흐름',
          steps: [
            '사용자 검색 요청',
            '검색 조건 전달',
            '통합 검색 로직 실행',
            '프로젝트 / 카테고리 / 스킬 / 개발자 조회',
            '페이지 결과 반환',
          ],
        },
        {
          type: 'summaryBox',
          label: '캐시가 필요했던 이유',
          items: [
            '같은 검색 조건의 요청도 매번 실제 검색 흐름으로 이어졌습니다.',
            '통합 검색은 여러 도메인 데이터를 함께 조회했습니다.',
            '데이터 변경 후 이전 검색 결과가 남으면 최신 정보가 반영되지 않을 수 있었습니다.',
          ],
        },
      ],
    },
    {
      number: '03',
      id: 'search-cache',
      title: 'Redis Cache Design',
      navTitle: '검색 결과 캐시 설계',
      navSubtitle: 'key, TTL, Cache-Aside',
      lead: '검색 조건을 캐시 키로 분리하고,\nCache Miss일 때만 실제 검색 로직을 실행했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '반복 검색 요청은 먼저 Redis Cache에서 확인했습니다.\n동일한 keyword 검색이라도 page와 size가 달라지면 응답에 포함되는 결과 범위가 달라지므로,\n캐시 키를 keyword / page / size 조합으로 분리했습니다.',
          ],
        },
        {
          type: 'cacheDesign',
          flow: {
            title: 'Cache-Aside 조회 흐름',
            entry: ['검색 요청', '캐시 키 생성', 'Redis Cache 조회'],
            hit: ['Redis에 저장된 검색 결과 반환', '실제 검색 로직 실행하지 않음'],
            miss: ['실제 검색 로직 실행', '검색 결과 Redis 저장', '응답 반환'],
          },
          why: {
            title: 'Cache-Aside를 선택한 이유',
            items: [
              '통합 검색은 같은 조건의 반복 요청이 발생할 수 있었습니다.',
              '검색 결과는 여러 도메인 데이터를 조합한 응답이므로, 요청 시점에 캐시를 먼저 확인하는 방식이 적합했습니다.',
              'Cache Hit에서는 실제 검색 로직을 건너뛰고, Cache Miss에서만 검색 결과를 생성해 Redis에 저장했습니다.',
            ],
          },
          keyRules: {
            title: '캐시 키 정책',
            items: [
              {
                label: '캐시 대상',
                text: '프로젝트, 카테고리, 스킬, 개발자 데이터를 포함한 통합 검색 응답 결과',
              },
              {
                label: '캐시 키 기준',
                text: 'keyword / page / size',
                tone: 'primary',
              },
              {
                label: 'keyword 단독 키의 한계',
                text: '같은 keyword라도 page와 size가 달라지면 응답 범위가 달라집니다.',
              },
              {
                label: 'TTL',
                text: '검색 결과가 장시간 남지 않도록 5분 만료 시간을 적용했습니다.',
              },
            ],
          },
        },
      ],
    },
    {
      number: '04',
      id: 'cache-consistency',
      title: 'Cache Consistency Design',
      navTitle: '캐시 정합성 설계',
      navSubtitle: '데이터 변경과 무효화 기준',
      lead: '프로젝트 데이터가 변경되면 검색 캐시를 무효화하고,\n다음 검색부터 최신 결과를 조회하도록 했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '통합 검색 결과는 keyword / page / size 조합별로 Redis 캐시에 저장됩니다. 하나의 프로젝트 변경이 여러 검색어와 페이지 조합에 영향을 줄 수 있어,\n변경된 데이터가 포함된 캐시 키만 정확히 찾아 제거하기는 어려웠습니다.',
            '따라서 프로젝트 생성·수정·삭제 시 Spring Cache의 @CacheEvict와 RedisCacheManager를 이용해 globalSearch 검색 결과 캐시를 전체 무효화했습니다. 이후 첫 검색 요청에서 최신 데이터를 다시 조회하고, 조회 결과를 Redis 캐시에 저장하도록 구성했습니다.',
          ],
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: '생성',
              text: '새 프로젝트가 기존 검색 조건에 포함되더라도, 변경 전에 생성된 캐시에는 해당 프로젝트가 없으므로 검색 결과에 바로 나타나지 않을 수 있습니다.',
            },
            {
              label: '수정',
              text: '제목·카테고리·스킬 등 검색 대상 정보가 변경되어도, 변경 전에 생성된 캐시가 남아 있으면 이전 정보가 반환될 수 있습니다.',
              tone: 'primary',
            },
            {
              label: '삭제',
              text: '삭제된 프로젝트가 포함된 기존 캐시가 남아 있으면, 이후 검색에서도 삭제 전 결과가 계속 반환될 수 있습니다.',
            },
          ],
        },
        {
          type: 'callout',
          label: '검색 결과 최신성 기준',
          text: '데이터가 변경된 이후에는 변경 전 검색 결과를 재사용하지 않고, 다음 검색 요청에서 최신 데이터를 다시 조회하는 것을 캐시 정합성의 기준으로 삼았습니다.',
        },
        {
          type: 'tabs',
          tabs: [
            {
              id: 'all-entries',
              label: '무효화 결정',
              title: '검색 결과에 영향을 주는 데이터 변경 경로에서는\n검색 결과 캐시 전체 무효화를 선택했습니다.',
              text: '변경된 프로젝트가 포함된 모든 검색 캐시 키를 역추적하려면 별도의 키 매핑 구조가 필요했습니다. 현재 구조에서는 선택 삭제의 복잡도를 늘리기보다 검색 결과의 최신성을 우선했습니다.\n\n프로젝트 생성·수정·삭제 경로에 @CacheEvict를 적용하고, allEntries = true를 사용해 globalSearch 검색 결과 캐시를 전체 무효화했습니다.',
              cards: {
                columns: 2,
                items: [
                  {
                    label: '선택 삭제의 한계',
                    text: '검색 결과는 keyword / page / size 조합별로 저장됩니다. 하나의 프로젝트 변경이 어떤 검색어와 페이지 조합에 포함되어 있는지 역추적하려면 별도의 캐시 키 매핑 구조가 필요했습니다.',
                  },
                  {
                    label: '@CacheEvict 적용',
                    text: 'Spring Cache의 @CacheEvict와 RedisCacheManager를 이용해 별도의 Redis 키 삭제 코드를 직접 작성하지 않고, globalSearch 검색 결과 캐시를 선언적으로 무효화했습니다.',
                    tone: 'primary',
                  },
                  {
                    label: 'allEntries = true',
                    text: '변경된 프로젝트가 포함된 개별 캐시 키를 추적하지 않고, globalSearch 캐시 영역에 저장된 검색 결과 엔트리를 전체 제거했습니다.',
                  },
                  {
                    label: '수용한 트레이드오프',
                    text: '전체 무효화 직후 첫 검색 요청은 Cache Miss로 실제 검색 로직과 DB 조회를 다시 수행합니다. 일부 Cache Miss 증가를 수용하는 대신, 변경 이전 검색 결과가 사용자에게 계속 반환되지 않는 것을 우선했습니다.',
                  },
                ],
              },
              callout: '선택 결과\n변경 직후 첫 검색 요청은 Cache Miss로\n실제 검색 로직과 DB 조회를 다시 수행합니다.\n\n대신 변경 이전 검색 결과가 계속 반환되는 것을 방지하고,\n다음 검색부터는 최신 결과가 저장된 Redis 캐시를 재사용하도록 구성했습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'change-paths',
              label: '무효화 흐름',
              title: '데이터 변경 이후 첫 검색 요청에서 최신 결과를 다시 적재합니다.',
              text: '검색 캐시를 제거한 뒤에는 다음 검색 요청이 Cache Miss로 이어집니다.\n이 요청에서 최신 데이터를 다시 조회해 Redis에 저장하고, 이후 동일 조건의 검색부터는 갱신된 캐시를 재사용합니다.',
              cards: {
                columns: 3,
                items: [
                  {
                    label: '데이터 변경',
                    text: '프로젝트 생성·수정·삭제로 검색 결과에 영향을 주는 데이터가 변경됩니다.',
                  },
                  {
                    label: '캐시 무효화',
                    text: '@CacheEvict(allEntries = true)가 실행되고, RedisCacheManager가 관리하는 globalSearch 검색 결과 캐시가 무효화됩니다.',
                    tone: 'primary',
                  },
                  {
                    label: 'Cache Miss',
                    text: '다음 검색 요청에서는 기존 검색 결과 캐시가 없으므로 실제 검색 흐름으로 이어집니다.',
                  },
                  {
                    label: '최신 데이터 조회',
                    text: 'DB에서 변경 내용이 반영된 최신 검색 결과를 다시 조회합니다.',
                  },
                  {
                    label: 'Redis 캐시 재적재',
                    text: '조회한 최신 검색 결과를 Redis 캐시에 다시 저장합니다.',
                    tone: 'primary',
                  },
                  {
                    label: '이후 요청',
                    text: '이후 동일한 검색 조건의 요청은 최신 결과가 저장된 Redis 캐시에서 응답합니다.',
                  },
                ],
              },
              callout: '결과\n데이터 변경 전 검색 결과가 계속 반환되는 문제를 방지하고,\n이후 요청부터 최신 검색 결과를 캐시로 재사용하도록 구성했습니다.',
              calloutTone: 'soft',
            },
          ],
        },
      ],
    },
    {
      number: '05',
      id: 'result',
      title: 'k6 Performance Verification',
      navTitle: 'k6 성능 검증',
      navSubtitle: 'v1 / v2 결과 비교',
      lead: '최대 100 VU까지 증가시키는 동일한 k6 시나리오로\n캐시 미적용 v1과 Redis Cache 적용 v2를 비교했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '검증의 목적은 같은 조건에서 캐시 미적용 v1과 Redis Cache 적용 v2의 응답 시간과 처리량이 어떻게 달라졌는지 확인하는 것이었습니다.',
            '비교는 Local Docker 환경에서 projects 50,009건 데이터를 기준으로 진행했고, k6 Ramp-up 시나리오에서 최대 100 VU까지 증가시키며 실행했습니다.\n요청 수는 고정값이 아니라, 동일한 실행 시간 동안 완료된 요청 건수입니다.',
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              id: 'k6-v1',
              label: 'v1 캐시 미적용',
              title: 'v1은 반복 검색 요청이 매번 실제 검색 흐름으로 이어졌습니다.',
              text: '캐시를 적용하지 않은 기준 결과입니다. 같은 검색 조건의 요청도 매번 실제 검색 흐름으로 이어졌고, 평균 응답 시간과 p95가 초 단위로 측정됐습니다.',
              callout: 'v1 결과는 Redis Cache 적용 전 기준선입니다. 이후 v2와 비교하기 위해 동일한 최대 100 VU 조건으로 실행했습니다.',
              calloutTone: 'soft',
              supportCards: [
                {
                  title: 'v1 캐시 미적용 k6 실행 결과',
                  text: 'TOTAL RESULTS와 HTTP 지표에서 평균 응답 시간, p95, 처리량, 실패율을 확인했습니다.',
                  image: {
                    src: '/readys7-images/readys7-k6-v1-no-cache.png',
                    alt: 'Ready’s7 v1 캐시 미적용 k6 테스트 결과',
                  },
                  items: [
                    { label: '평균 응답 시간', value: '1.94s' },
                    { label: 'p95', value: '3.56s' },
                    { label: '처리량', value: '16.19 req/s' },
                    { label: '요청 수', value: '2,436' },
                    { label: '실패율', value: '0%' },
                    { label: '최대 VU', value: '100' },
                  ],
                },
              ],
            },
            {
              id: 'k6-v2',
              label: 'v2 Redis Cache 적용',
              title: 'v2는 반복 검색 요청을 Redis Cache에서 응답하도록 적용했습니다.',
              text: 'Redis Cache 적용 후의 비교 결과입니다. Cache Hit 구간에서는 실제 검색 로직을 거치지 않고 캐시된 검색 결과를 반환하도록 구성했습니다.',
              callout: '동일한 최대 100 VU 조건에서 실패율 0%를 유지했고, 평균 응답 시간과 p95는 ms 단위로 측정됐습니다.',
              calloutTone: 'soft',
              supportCards: [
                {
                  title: 'v2 Redis Cache 적용 k6 실행 결과',
                  text: 'Redis Cache 적용 후 동일한 최대 100 VU 조건에서 측정한 결과입니다.',
                  image: {
                    src: '/readys7-images/readys7-k6-v2-redis-cache.png',
                    alt: 'Ready’s7 v2 Redis Cache 적용 k6 테스트 결과',
                  },
                  items: [
                    { label: '평균 응답 시간', value: '3.73ms' },
                    { label: 'p95', value: '6.39ms' },
                    { label: '처리량', value: '46.68 req/s' },
                    { label: '요청 수', value: '7,046' },
                    { label: '실패율', value: '0%' },
                    { label: '최대 VU', value: '100' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
},
};
