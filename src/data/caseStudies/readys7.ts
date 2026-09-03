import type { CaseStudyContent } from './types';

export const readys7CaseStudy: CaseStudyContent = {
  projectLabel: 'Ready’s7',
  description:
    '통합 검색 Redis Cache 적용으로 반복 DB 직접 조회를 줄이고, 데이터 변경 후 오래된 검색 결과가 남지 않도록 무효화 기준을 설계한 백엔드 Case Study입니다.',
  sections: [
    {
      number: '01',
      id: 'overview',
      title: '프로젝트 개요',
      navTitle: '프로젝트 개요',
      navSubtitle: '서비스 소개',
      lead: '클라이언트가 프로젝트를 등록하고,\n개발자가 탐색과 제안을 통해\n협업 기회를 만드는 플랫폼입니다.',
      content: [
        {
          type: 'hero',
          label: '서비스 소개',
          paragraphs: [
            '클라이언트는 필요한 개발 프로젝트를 등록하고, 개발자는 통합 검색을 통해 조건에 맞는 프로젝트와 관련 정보를 탐색한 뒤 제안서를 제출할 수 있습니다.',
            '클라이언트는 전달된 제안과 개발자 정보를 확인한 뒤, 채팅으로 프로젝트 내용을 조율합니다. 협업 경험은 리뷰로 남겨 개발자 정보를 확인할 때 참고할 수 있도록 구성했습니다.',
          ],
          scope: ['통합 검색', '프로젝트 등록', '제안서 제출·확인', '채팅·리뷰'],
          visualSrc: '/readys7-images/readys7-overview-hero.png',
          visualAlt: '클라이언트와 개발자를 연결하는 Ready’s7 매칭 플랫폼 3D 일러스트레이션',
        },
        {
          type: 'cards',
          columns: 4,
          items: [
            { label: '통합 검색·탐색', text: '프로젝트·개발자·카테고리·기술스택을\n하나의 통합 검색에서 조회할 수 있습니다.' },
            { label: '프로젝트 등록', text: '클라이언트는 필요한 개발 프로젝트와\n요구 조건을 등록할 수 있습니다.' },
            { label: '제안서 제출·확인', text: '개발자는 프로젝트에 제안서를 제출하고, 클라이언트는 전달된 제안과 개발자 정보를 확인합니다.' },
            { label: '채팅·리뷰', text: '채팅을 통해 프로젝트 조건과 협업 내용을 조율하고, 협업 경험은 리뷰로 남길 수 있습니다.' },
          ],
        },
      ],
    },
    {
      number: '02',
      id: 'problem',
      title: '문제 정의',
      navTitle: '문제 정의',
      navSubtitle: '반복 검색과 결과 최신성',
      lead: '같은 검색 조건의 요청이 반복될 때마다 검색 과정을 다시 수행했고,\nCache 적용 후에는 변경된 데이터가 기존 검색 결과에 바로 반영되지 않았습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '통합 검색은 프로젝트, 개발자, 카테고리, 스킬을 함께 조회하는 기능이었습니다.',
            '초기에는 같은 검색 조건에서도 조회와 결과 조합을 다시 수행했고,\n검색 결과를 재사용한 이후에는 데이터 변경이 기존 검색 결과에 바로 반영되지 않는 문제를 확인했습니다.',
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              id: 'before-cache',
              label: '반복 검색',
              title: '같은 검색 조건에서도 검색 대상 조회와 결과 조합을 다시 수행하는 문제가 있었습니다.',
              diagrams: [
                {
                  type: 'sequence',
                  density: 'compact',
                  connectorTone: 'subtle',
                  layout: 'deck',
                  label: '기존 통합 검색 처리 흐름',
                  steps: [
                    {
                      title: '검색 요청',
                      text: '사용자가 통합 검색 요청 전달',
                    },
                    {
                      title: '통합 검색 실행',
                      text: '전달된 검색 조건으로 통합 검색 로직 수행',
                    },
                    {
                      title: '검색 대상 조회',
                      text: '프로젝트\n개발자\n카테고리\n기술스택',
                    },
                    {
                      title: '결과 조합',
                      text: '각 검색 대상의 결과를 하나의 응답으로 구성',
                    },
                    {
                      title: '응답 반환',
                      text: '조합된 통합 검색 결과를 사용자에게 반환',
                    },
                  ],
                },
              ],
              subsection: {
                title: '',
                paragraphs: [],
                callout: '이전 검색 결과를 재사용하는 구조가 없어, 동일 조건의 반복 요청에서도 검색 대상 조회와 결과 조합 과정을 다시 수행하는 문제가 있었습니다.',
              },
            },
            {
              id: 'after-cache',
              label: '결과 최신성',
              title: '데이터가 변경된 뒤에도 이전 검색 결과가 그대로 반환되는 문제가 발생했습니다.',
              text: '기존 통합 검색 결과가 Cache에 저장된 뒤, 신규 개발자 회원가입으로 개발자와 기술스택 정보가 저장되었습니다.\n이후 이전과 동일한 조건으로 다시 검색했을 때 기존 Cache 결과가 반환되어 신규 개발자 정보가 통합 검색 결과에 바로 나타나지 않았습니다.',
              flow: [
                {
                  title: '기존 통합 검색 수행',
                  text: '동일 검색 조건의 결과가 Cache에 저장됨',
                },
                {
                  title: '신규 개발자 회원가입',
                  text: '개발자와 기술스택 정보가 함께 저장되어 원천 데이터 변경',
                },
                {
                  title: '이전과 동일한 조건으로 다시 검색',
                  text: '같은 검색 조건으로 다시 요청',
                },
                {
                  title: '데이터 변경 전 Cache 결과 반환',
                  text: '기존에 저장되어 있던 검색 결과 반환',
                },
                {
                  title: '신규 개발자 정보 미반영',
                  text: '신규 개발자가 통합 검색 결과에 나타나지 않음',
                },
              ],
              cards: {
                label: '문제의 본질',
                columns: 2,
                items: [
                  {
                    label: '원천 데이터 변경',
                    text: '신규 개발자 회원가입으로 개발자와 기술스택 관련 데이터가 변경됐습니다.',
                  },
                  {
                    label: '기존 검색 결과 유지',
                    text: '동일 조건에서는 데이터 변경 전에 저장된 검색 결과가 반환됐습니다.',
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      number: '03',
      id: 'search-cache',
      title: 'Redis Cache Design',
      navTitle: '검색 캐시 설계',
      navSubtitle: 'Cache-Aside와 Key · TTL',
      lead: '검색 조건별 캐시 키 구성, Cache Miss 시 통합 검색 수행',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '반복 검색 요청에서는 Redis Cache를 먼저 확인하고, 요청 조건별 검색 결과를 저장하도록 구성했습니다.',
          ],
        },
        {
          type: 'cards',
          label: '구현 범위',
          columns: 2,
          items: [
            {
              label: '구현 범위',
              text: '초기 QueryDSL 기반 통합 검색 구현과 Cache 적용·검증을 담당했습니다. 이후 팀의 인덱스 최적화 과정에서 일부 검색 방식이 FullText/ngram 기반으로 변경되었습니다.',
            },
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              id: 'cache-structure',
              label: '캐시 구조 선택',
              title: '반복 검색 결과를 재사용하기 위해 Cache 구조를 단계적으로 전환했습니다.',
              flow: [
                {
                  title: '캐시 미적용 초기 구조',
                  text: '같은 검색 조건이 반복되어도 매번 실제 통합 검색 로직과 조회 과정을 다시 수행했습니다.',
                },
                {
                  title: 'Caffeine Local Cache',
                  text: '초기에는 애플리케이션 내부 Local Cache로\n반복 검색 결과를 재사용하는 구조를 적용했습니다.',
                },
                {
                  title: 'Redis Cache',
                  text: '여러 인스턴스로 확장할 경우 Local Cache가\n인스턴스별로 분리될 수 있는 구조를 고려해 공유\nCache로 사용할 수 있는 Redis Cache로 전환했습니다.',
                },
              ],
              supplementalCards: {
                label: 'Redis 선택 이유',
                columns: 2,
                items: [
                  {
                    label: 'Local Cache의 한계',
                    text: 'Local Cache는 애플리케이션 인스턴스 내부에 존재하므로,\n인스턴스가 여러 개가 되면 캐시가 서로 분리될 수 있습니다.',
                  },
                  {
                    label: 'Redis 선택',
                    text: '여러 인스턴스로 확장할 경우에도 검색 결과를 공유할 수 있도록 외부 캐시인 Redis를 선택했습니다.',
                  },
                ],
              },
            },
            {
              id: 'cache-aside-flow',
              label: 'Cache-Aside 조회 흐름',
              title: '검색 요청에서 Redis Cache를 먼저 확인하는 흐름으로 구성했습니다.',
              flow: [
                {
                  title: '검색 요청',
                },
                {
                  title: '캐시 키 생성',
                },
                {
                  title: 'Redis Cache 조회',
                },
              ],
              cards: {
                label: 'Cache 조회 결과',
                columns: 2,
                items: [
                  {
                    label: 'Cache Hit',
                    text: 'Redis에 저장된 검색 결과를 반환하고, 실제 통합 검색 로직은 실행하지 않습니다.',
                  },
                  {
                    label: 'Cache Miss',
                    text: '실제 통합 검색 로직을 실행하고, 생성된 검색 결과를 Redis에 저장한 뒤 응답합니다.',
                    tone: 'primary',
                  },
                ],
              },
              supplementalCards: {
                label: 'Cache-Aside를 선택한 이유',
                columns: 2,
                items: [
                  {
                    label: '반복 검색 결과 재사용',
                    text: '통합 검색에서는 같은 검색 조건이 반복될 수 있었고, 여러 검색 대상을 조합한 결과를 Cache에서 먼저 확인해 기존 결과를 재사용할 수 있었습니다.',
                  },
                  {
                    label: '구현 기준',
                    text: 'Spring Cache의 @Cacheable을 적용해 Cache Hit이면 저장된 결과를 반환하고, Cache Miss일 때 실제 통합 검색을 수행하도록 구성했습니다.',
                  },
                ],
              },
            },
            {
              id: 'cache-key-ttl',
              label: '캐시 키 · TTL',
              title: '검색 결과를 요청 조건별로 구분하고 5분 동안 유지했습니다.',
              cards: {
                label: '캐시 키 정책',
                columns: 2,
                items: [
                  {
                    label: '캐시 대상',
                    text: '프로젝트, 카테고리, 기술스택, 개발자 정보를 포함한 통합 검색 결과',
                  },
                  {
                    label: '캐시 키 구성',
                    text: '캐시 이름: globalSearch\n구분 기준: keyword / page / size\n키 생성 형식: v2:{keyword}:{page}:{size}',
                    tone: 'primary',
                  },
                  {
                    label: '검색 결과 분리 기준',
                    text: '같은 keyword라도 page와 size가 다르면 반환 범위가 달라지므로,\n서로 다른 캐시 결과로 구분했습니다.',
                  },
                  {
                    label: 'TTL',
                    text: '검색 결과 캐시에 5분 TTL을 적용했습니다.',
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      number: '04',
      id: 'cache-consistency',
      title: 'Cache Consistency Design',
      navTitle: '캐시 정합성',
      navSubtitle: '데이터 변경과 캐시 무효화',
      lead: '데이터 변경 이후에도 검색 결과의 최신성을 유지할 방법이 필요했습니다.\n현재 구조에서는 주요 데이터 변경 시 검색 캐시를 무효화하는 방향을 선택했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '통합 검색 결과를 keyword / page / size 조합별로 Redis 캐시에 저장하도록 구성했습니다. 하나의 데이터 변경이 여러 검색어와 페이지 조합에 영향을 줄 수 있어,\n변경된 데이터가 포함된 캐시 키를 변경 시점에 모두 역추적하기는 어려웠습니다.',
            '데이터 변경 이후에도 검색 결과의 최신성을 유지할 방법이 필요했습니다.\n현재 구조에서는 검색 결과에 영향을 주는 주요 데이터가 변경되면 기존 검색 캐시를 무효화하는 방향을 선택했습니다.',
          ],
        },
        {
          type: 'cards',
          label: '검색 결과 최신성 기준',
          columns: 2,
          items: [
            {
              label: '검색 결과 최신성 기준',
              text: '데이터가 변경된 이후에는 변경 전 검색 결과를 재사용하지 않고, 다음 검색 요청에서 최신 데이터를 기준으로 실제 통합 검색을 수행하는 것을 캐시 정합성의 기준으로 삼았습니다.',
            },
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              id: 'all-entries',
              label: '무효화 결정',
              title: '검색 결과의 최신성과 구현 복잡도를 함께 고려해, 주요 데이터 변경 경로에서는 검색 결과 캐시 전체 무효화를 선택했습니다.',
              text: '변경된 데이터가 어떤 검색 조건에 포함되는지 역추적해 선택적으로 삭제하려면 별도의 키 매핑 구조가 필요했습니다.\n현재 프로젝트에서는 이 구조를 추가하는 복잡도보다 검색 결과의 최신성을 우선하는 방향을 선택했습니다.\n\n검색 결과에 영향을 주는 주요 데이터 변경 경로에 @CacheEvict를 적용하고,\nallEntries = true를 사용해 globalSearch 검색 결과 캐시를 전체 무효화했습니다.',
              cards: {
                columns: 2,
                items: [
                  {
                    label: '선택 삭제 시 고려사항',
                    text: '검색 결과가 keyword / page / size 조합별로 저장되는 구조였기 때문에, 하나의 데이터 변경이 여러 검색 조건에 영향을 줄 수 있었습니다. 변경된 데이터가 포함된 캐시만 선택적으로 찾으려면 별도의 역추적 구조가 필요했습니다.',
                  },
                  {
                    label: '@CacheEvict 적용',
                    text: 'Spring Cache의 @CacheEvict를 적용해 검색 결과에 영향을 주는 주요 데이터 변경 시\n기존 검색 캐시를 무효화하도록 구성했습니다.',
                    tone: 'primary',
                  },
                  {
                    label: 'allEntries = true',
                    text: '별도의 키 매핑 구조를 추가하는 대신, 현재 구조에서는 allEntries = true를 사용해\nglobalSearch 검색 결과 캐시를 전체 무효화하는 방식을 선택했습니다.',
                  },
                  {
                    label: '수용한 한계',
                    text: '전체 무효화를 선택하면서 변경된 데이터와 직접 관련 없는 검색 결과 캐시까지 함께 제거될 수 있는 점을 수용했습니다. 이후 해당 검색 조건이 다시 요청되면 Cache Miss가 발생해 실제 통합 검색을 다시 수행한 뒤, 최신 결과를 Redis에 재적재하도록 구성했습니다. 현재 프로젝트에서는 이러한 추가 조회 비용보다 변경 전 검색 결과가 계속 재사용되는 문제를 방지하는 것을 우선했습니다.',
                  },
                ],
              },
            },
            {
              id: 'change-paths',
              label: '무효화 흐름',
              title: '데이터 변경 이후 첫 검색 요청에서 최신 결과를 다시 적재했습니다.',
              text: '검색 캐시를 제거한 뒤에는 다음 검색 요청에서 Cache Miss가 발생했습니다.\n이 요청에서 최신 데이터를 기준으로 실제 통합 검색 로직을 실행해 검색 결과를 생성하고 Redis에 다시 저장했습니다. 이후 동일 조건의 검색부터는 갱신된 캐시를 재사용했습니다.',
              cards: {
                columns: 3,
                items: [
                  {
                    label: '데이터 변경',
                    text: '검색 결과에 영향을 주는 데이터 변경',
                  },
                  {
                    label: '캐시 무효화',
                    text: 'globalSearch 검색 결과 캐시 전체 무효화',
                    tone: 'primary',
                  },
                  {
                    label: 'Cache Miss',
                    text: '기존 검색 캐시 제거로 Cache Miss 발생',
                  },
                  {
                    label: '최신 결과 구성',
                    text: '최신 데이터 기준 통합 검색 결과 생성',
                  },
                  {
                    label: 'Redis 캐시 재적재',
                    text: '생성한 최신 검색 결과를 Redis Cache에 재저장',
                    tone: 'primary',
                  },
                  {
                    label: '이후 요청',
                    text: '동일 조건 검색에서 갱신된 캐시 재사용',
                  },
                ],
              },
              supplementalCards: {
                label: '무효화 동작 검증',
                columns: 2,
                items: [
                  {
                    label: '검증 시나리오',
                    text: '동일 검색 조건으로 캐시를 생성한 뒤 프로젝트 정보를 수정하고 다시 검색해, 변경된 내용이 검색 결과에 반영되는지 확인했습니다.',
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      number: '05',
      id: 'result',
      title: 'k6 Performance Verification',
      navTitle: '성능 검증',
      navSubtitle: 'k6 캐시 적용 전 · 후 비교',
      lead: '동일한 k6 반복 검색 시나리오에서 캐시 미적용 v1과 Redis Cache 적용 v2를 비교했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '반복 검색에서 Redis Cache 적용 전·후의 응답 특성이 어떻게 달라지는지 확인하기 위해, 캐시 미적용 v1과 Redis Cache 적용 v2를 동일한 조건에서 비교했습니다.',
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              id: 'k6-test-plan',
              label: '공통 테스트 설계',
              title: 'Redis Cache 적용 전·후의 반복 검색 응답 특성을 비교하기 위해 동일한 k6 시나리오를 구성했습니다.',
              text: '운영 환경의 최대 처리량을 측정하기보다,\n동일한 Local Docker 환경과 반복 검색 시나리오에서 Redis Cache 적용 전·후의 응답 특성을 비교하는 것을 목적으로 했습니다.',
              cards: {
                label: '테스트 조건',
                columns: 4,
                items: [
                  {
                    label: '테스트 환경',
                    text: 'Local Docker 환경',
                  },
                  {
                    label: '검색 데이터',
                    text: '프로젝트 약 5만 건을 적재한 상태에서\n프로젝트·개발자·카테고리·기술스택을 대상으로 통합 검색 수행',
                  },
                  {
                    label: '반복 검색 조건',
                    text: 'Java / Spring / React / Python / Docker 키워드를 반복 요청해 동일 검색 조건이 재요청되는 상황 구성',
                  },
                  {
                    label: '부하 시나리오',
                    text: '30초간 10 VU → 30초간 50 VU → 1분간 100 VU → 마지막 30초 동안\n0 VU까지 감소',
                  },
                ],
              },
              supplementalCards: {
                label: '검증 목적과 비교 기준',
                columns: 3,
                items: [
                  {
                    label: '검증 목적',
                    text: '동일한 반복 검색 조건에서 Redis Cache 적용 전·후의 응답 특성 차이 확인',
                  },
                  {
                    label: '측정 지표',
                    text: '평균 응답 시간, p95 응답 시간, 초당 처리량,\n완료 요청 수, 실패율을 비교했습니다.',
                  },
                  {
                    label: '요청 수 해석',
                    text: '요청 수를 고정하지 않고 동일한 실행 시간과 부하 조건을 적용했으며, 해당 시간 동안 완료된 요청 수와 응답 시간, 처리량을 비교했습니다.',
                  },
                ],
              },
              callout: '비교 당시 v1과 v2는 동일한 통합 검색 대상을 기준으로 했습니다. v1은 요청마다 실제 통합 검색을 수행했고,\nv2는 Redis Cache를 적용해 반복 검색 결과를 재사용하도록 구분해 비교했습니다. 이후 리팩터링과 팀의 검색 최적화 과정에서 최종 검색 구조 일부가 변경되었습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'k6-v1',
              label: 'v1 캐시 미적용',
              title: '같은 검색 조건이 반복되어도 매 요청마다 실제 통합 검색을 수행했습니다.',
              text: '캐시를 적용하지 않은 상태에서 동일한 검색 조건을 반복 요청했습니다.\n같은 검색 조건이 다시 들어와도 매 요청마다 프로젝트·개발자·카테고리·기술스택을 대상으로 실제 통합 검색을 수행하도록 두고 결과를 측정했습니다.',
              callout: '동일 조건의 반복 검색에서도 매 요청마다 실제 통합 검색을 수행했고, 평균 응답 시간 1.94초, p95 응답 시간 3.56초로 측정됐습니다.\n같은 실행 시간 동안 2,436건의 요청이 완료됐습니다.',
              calloutTone: 'soft',
              supportCards: [
                {
                  title: 'v1 실행 결과',
                  text: 'k6 결과 화면에서 평균 응답 시간, p95 응답 시간, 초당 처리량, 완료 요청 수, 실패율, 최대 동시 사용자를 확인했습니다.',
                  image: {
                    src: '/readys7-images/readys7-k6-v1-no-cache.png',
                    alt: 'Ready’s7 v1 캐시 미적용 k6 테스트 결과',
                    crop: 'k6-v1-result',
                  },
                  items: [
                    { label: '평균 응답 시간', value: '1.94s' },
                    { label: 'p95 응답 시간', value: '3.56s' },
                    { label: '초당 처리량', value: '16.19 req/s' },
                    { label: '완료 요청 수', value: '2,436' },
                    { label: '실패율', value: '0%' },
                    { label: '최대 동시 사용자', value: '100 VU' },
                  ],
                },
              ],
            },
            {
              id: 'k6-v2',
              label: 'v2 Redis Cache 적용',
              title: '반복 검색 결과를 Redis Cache에서 재사용하도록 구성했습니다.',
              text: 'v2에서는 동일한 검색 조건을 반복 요청했고, 캐시에 검색 결과가 존재하는 요청에서는 Redis Cache에 저장된 결과를 재사용하도록 구성했습니다.\nCache Hit 시에는 실제 통합 검색을 다시 수행하지 않고 Redis에 저장된 검색 결과를 반환하도록 구성했습니다.\n따라서 이 결과는 Cache Miss 한 번의 처리 시간을 별도로 측정한 값이 아니라, 반복 검색 과정에서 Cache Hit가 발생하는 시나리오의 응답 특성을 보여줍니다.',
              callout: 'Redis Cache를 재사용하는 반복 검색 시나리오에서 평균 응답 시간은 3.73ms, p95 응답 시간은 6.39ms로 측정됐으며,\n동일한 실행 시간 동안 7,046건의 요청이 완료됐습니다.',
              calloutTone: 'soft',
              supportCards: [
                {
                  title: 'v2 실행 결과',
                  text: 'k6 결과 화면에서 평균 응답 시간, p95 응답 시간, 초당 처리량, 완료 요청 수, 실패율, 최대 동시 사용자를 확인했습니다.',
                  image: {
                    src: '/readys7-images/readys7-k6-v2-redis-cache.png',
                    alt: 'Ready’s7 v2 Redis Cache 적용 k6 테스트 결과',
                    crop: 'k6-v2-result',
                  },
                  items: [
                    { label: '평균 응답 시간', value: '3.73ms' },
                    { label: 'p95 응답 시간', value: '6.39ms' },
                    { label: '초당 처리량', value: '46.68 req/s' },
                    { label: '완료 요청 수', value: '7,046' },
                    { label: '실패율', value: '0%' },
                    { label: '최대 동시 사용자', value: '100 VU' },
                  ],
                },
              ],
            },
            {
              id: 'k6-comparison',
              label: '결과 비교',
              title: '동일한 테스트 조건에서 캐시 미적용 v1과 Redis Cache 적용 v2의 측정 결과를 비교했습니다.',
              text: '같은 실행 시간과 부하 시나리오에서 측정된 결과를 한눈에 비교했습니다.',
              comparison: {
                columns: ['v1 캐시 미적용', 'v2 Redis Cache'],
                rows: [
                  { label: '평균 응답 시간', values: ['1.94s', '3.73ms'] },
                  { label: 'p95 응답 시간', values: ['3.56s', '6.39ms'] },
                  { label: '초당 처리량', values: ['16.19 req/s', '46.68 req/s'] },
                  { label: '완료 요청 수', values: ['2,436', '7,046'] },
                  { label: '실패율', values: ['0%', '0%'] },
                  { label: '최대 동시 사용자', values: ['100 VU', '100 VU'] },
                ],
              },
              subsection: {
                title: '비교 결과 해석',
                paragraphs: [
                  '동일한 2분 30초, 최대 100 VU 반복 검색 시나리오에서 Redis Cache 적용 후 평균 응답 시간과 p95가 크게 낮아졌고,\n같은 실행 시간 동안 완료된 요청 수와 초당 처리량은 증가했습니다. 두 테스트 모두 실패율은 0%였습니다.',
                  '이를 통해 비교 당시 구현 기준으로, 동일한 검색 조건이 반복되는 상황에서 Redis Cache를 통해 검색 결과를 재사용했을 때 응답 시간과 처리량의 차이를 확인했습니다.',
                ],
              },
            },
          ],
        },
      ],
    },
    {
      number: '06',
      id: 'demo',
      title: '시연 영상',
      navTitle: '시연 영상',
      navSubtitle: '주요 기능 동작 확인',
      lead: 'Ready’s7의 주요 기능과 사용자 흐름을 실제 화면에서 확인할 수 있습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '프로젝트 등록과 탐색, 제안서 제출·확인, 채팅과 리뷰까지 구현된 주요 흐름을 시연합니다.',
          ],
        },
        {
          type: 'video',
          src: '/readys7-demo.mp4',
          mimeType: 'video/mp4',
          title: 'Ready’s7 주요 사용 흐름 시연',
          description: '프로젝트 등록과 탐색, 제안서 제출·확인, 채팅과 리뷰로 이어지는 흐름입니다.',
        },
      ],
    },
  ],
};
