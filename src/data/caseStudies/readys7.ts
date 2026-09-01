import type { CaseStudyContent } from './types';

export const readys7CaseStudy: CaseStudyContent = {
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
      lead: '통합 검색은 같은 검색 조건의 요청이 반복돼도 매번 검색 로직과 DB 조회를 다시 수행했습니다.',
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
      lead: '검색 조건을 캐시 키로 분리하고, Cache Miss일 때만 실제 검색 로직을 실행했습니다.',
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
      lead: '프로젝트 데이터가 변경되면 검색 캐시를 무효화하고, 다음 검색부터 최신 결과를 조회하도록 했습니다.',
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
      lead: '최대 100 VU까지 증가시키는 동일한 k6 시나리오로 캐시 미적용 v1과 Redis Cache 적용 v2를 비교했습니다.',
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
};
