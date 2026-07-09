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
              '초기 통합 검색 구조에서는 여러 도메인별 검색 조건과 응답 구조를 연결했습니다.',
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
          text: '핵심은 Redis와 Kafka 사용 자체가 아니라, 요청 진입 순서 · 포인트 변경 정합성 · 이벤트 발행 시점을 각각 다른 기준으로 분리해 검증하는 것이었습니다.',
        },
      ],
    },
    {
      number: '03',
      id: 'boundary',
      title: 'Flow Split Design',
      navTitle: '흐름 분리 설계',
      navSubtitle: '락 · 트랜잭션 · 이벤트 시점',
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
};


caseStudies.readys7 = {
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
      navSubtitle: 'key · TTL · Cache-Aside',
      lead: '검색 조건을 캐시 키로 분리하고,\nCache Miss일 때만 실제 검색 로직을 실행했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '반복 검색 요청은 먼저 Redis Cache에서 확인했습니다.\n동일한 keyword 검색이라도 page와 size가 달라지면 응답 범위가 달라지기 때문에,\n캐시 키를 keyword / page / size 조합으로 분리했습니다.',
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
      id: 'result',
      title: 'k6 Performance Verification',
      navTitle: 'k6 성능 검증',
      navSubtitle: 'v1 · v2 결과 비교',
      lead: '같은 최대 100 VU 조건에서\n테스트 당시 캐시 미적용 v1과 Redis Cache 적용 v2를 비교했습니다.',
      content: [
        {
          type: 'metrics',
          label: 'TEST CONDITION',
          items: [
            { label: '환경', value: 'Local Docker' },
            { label: '데이터', value: 'projects 50,009건' },
            { label: '도구', value: 'k6 Ramp-up' },
            { label: '조건', value: '최대 100 VU' },
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              id: 'k6-before-after',
              label: 'v1 / v2 비교',
              title: '응답 시간과 처리량을 같은 최대 100 VU 조건에서 비교했습니다.',
              text: '포트폴리오에서는 백엔드 코드를 새로 수정했다는 의미가 아니라, 테스트 당시 캐시 미적용 v1과 Redis Cache 적용 v2를 분리해 비교한 결과로 정리했습니다.',
              supportCards: [
                {
                  title: 'v1 캐시 미적용 k6 결과',
                  text: '반복 검색 요청이 매번 DB 직접 조회 흐름으로 이어지던 기준 결과입니다.',
                  image: { src: '/readys7-images/readys7-k6-v1-no-cache.png', alt: 'Ready’s7 v1 캐시 미적용 k6 테스트 결과' },
                  items: [
                    { label: '평균 응답 시간', value: '1.94s' },
                    { label: 'p95', value: '3.56s' },
                    { label: '처리량', value: '16.19 req/s' },
                    { label: '요청 수', value: '2,436' },
                    { label: '실패율', value: '0%' },
                    { label: '최대 VU', value: '100' },
                  ],
                },
                {
                  title: 'v2 Redis Cache 적용 k6 결과',
                  text: '반복 검색 결과를 Redis Cache로 응답하도록 적용한 뒤의 비교 결과입니다.',
                  image: { src: '/readys7-images/readys7-k6-v2-redis-cache.png', alt: 'Ready’s7 v2 Redis Cache 적용 k6 테스트 결과' },
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
              callout: '최대 처리량을 과장하기보다, 동일한 최대 100 VU 조건에서 평균 응답 시간과 처리량이 어떻게 달라졌는지에 초점을 맞췄습니다.',
              calloutTone: 'soft',
            },
          ],
        },
      ],
    },
    {
      number: '05',
      id: 'cache-consistency',
      title: 'Cache Consistency Design',
      navTitle: '캐시 정합성 설계',
      navSubtitle: '데이터 변경과 무효화 기준',
      lead: '데이터 변경 후 오래된 검색 결과가 남지 않도록\n검색 캐시 무효화 기준을 함께 설계했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '최초 검색 결과가 Redis에 저장되면 같은 keyword/page/size 요청은 DB를 다시 조회하지 않고 캐시 결과를 반환합니다.',
            '이때 새 프로젝트가 생성되거나 기존 정보가 수정되어도 캐시가 남아 있으면, 사용자는 데이터 변경이 반영되지 않은 오래된 검색 결과를 볼 수 있습니다.',
          ],
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            { label: '생성', text: '새 프로젝트가 검색 대상에 포함되어야 하지만 기존 캐시가 먼저 반환될 수 있습니다.' },
            { label: '수정', text: '제목, 카테고리, 스킬 같은 검색 대상 필드 변경이 검색 결과에 늦게 반영될 수 있습니다.', tone: 'primary' },
            { label: '삭제', text: '삭제된 데이터가 기존 검색 캐시에 남아 사용자에게 노출될 수 있습니다.' },
          ],
        },
        {
          type: 'callout',
          label: '정합성 기준',
          text: '여기서의 정합성은 포인트나 트랜잭션 정합성이 아니라, 데이터 변경 후 오래된 검색 결과를 방지하는 캐시 무효화 기준입니다.',
        },
        {
          type: 'tabs',
          tabs: [
            {
              id: 'all-entries',
              label: '결정',
              title: '변경 경로에서는 검색 캐시 전체 제거를 선택했습니다.',
              text: '검색 결과는 여러 keyword/page/size 조합으로 저장될 수 있어 특정 키만 역추적해 제거하기 어렵습니다. 그래서 검색 결과에 영향을 주는 생성, 수정, 삭제 경로에서는 @CacheEvict(value = "globalSearch", allEntries = true)를 적용했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '키 역추적 제거', text: '변경된 데이터가 어떤 검색어와 페이지 조합에 포함되는지 따로 관리하지 않았습니다.' },
                  { label: '전체 무효화', text: 'globalSearch 캐시를 전체 제거해 오래된 검색 결과가 남지 않게 했습니다.', tone: 'primary' },
                  { label: '운영 기준', text: '일부 Cache Miss 증가를 감수하고 검색 결과 신뢰성을 우선했습니다.' },
                ],
              },
              callout: '트레이드오프는 명확했습니다. 변경 직후 일부 요청은 다시 DB를 조회하지만, 사용자가 오래된 검색 결과를 보는 위험을 줄일 수 있었습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'change-paths',
              label: '적용 경로',
              title: '검색 결과에 영향을 주는 데이터 변경 지점에 무효화를 연결했습니다.',
              text: '프로젝트 생성, 수정, 삭제처럼 검색 결과를 바꿀 수 있는 경로에서는 캐시를 남겨두지 않는 것을 우선했습니다.',
              cards: {
                columns: 3,
                items: [
                  { label: '생성 이후', text: '새 데이터가 검색 결과에 나타나야 하므로 기존 globalSearch 캐시를 제거합니다.' },
                  { label: '수정 이후', text: '검색 대상 필드 변경이 다음 검색 결과에 반영되도록 캐시를 제거합니다.', tone: 'primary' },
                  { label: '삭제 이후', text: '삭제된 데이터가 캐시 결과로 노출되지 않도록 캐시를 제거합니다.' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};
