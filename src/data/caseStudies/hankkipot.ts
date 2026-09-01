import type { CaseStudyContent } from './types';

export const hankkipotCaseStudy: CaseStudyContent = {
    projectLabel: '한끼팟',
    description:
      '그룹 매칭 환경에서 GPS/QR 인증 상태 흐름을 다룬 케이스 스터디입니다.',
    sections: [
      {
        number: '01',
        id: 'overview',
        title: '개요',
        navTitle: '프로젝트 개요',
        navSubtitle: '서비스 소개',
        lead: 'GPS 장소 인증부터 QR 만남 인증, 완료 처리까지 하나의 상태 흐름으로 연결했습니다.',
        content: [
          {
            type: 'hero',
            label: '만남 인증 상태 흐름',
            paragraphs: [
              '한끼팟은 같은 대학의 학생들이 함께 식사할 사람을 모집하고, 실제 만남까지 인증하는 서비스입니다.',
              '저는 GPS 장소 인증과 QR 만남 인증, 위치 정보 처리를 담당하고, 인증 결과가 신청자별 Match 완료와 전체 Post 완료, 책임비 정산 흐름으로 이어지도록 연결했습니다.',
              '특히 여러 신청자가 하나의 Post에 참여하는 그룹 매칭에서 등록자의 장소 인증 상태가 모든 Match에 일관되게 반영되어야 하는 문제와, 하나의 QR을 공유하면서도 완료 상태는 신청자별로 분리해야 하는 문제를 중심으로 작업했습니다.',
            ],
            scope: ['서버 기준 GPS 인증', 'Post 단위 QR', '신청자별 Match 완료 연결', '책임비 정산 흐름 연결'],
          },
        ],
      },
      {
        number: '02',
        id: 'problem',
        title: '문제 정의',
        navTitle: '문제 정의',
        navSubtitle: '그룹 매칭의 상태 범위',
        lead: '그룹 매칭에서는 하나의 인증 결과를 모든 Match에 동일하게 처리할 수 없었습니다.',
        content: [
          {
            type: 'prose',
            paragraphs: [
              '하나의 Post에 여러 신청자의 Match가 연결되는 구조에서는 등록자와 신청자의 인증 범위, 그리고 QR 공유 단위와 완료 단위가 서로 달랐습니다.',
              '잘못된 상태 처리는 이후 QR 인증, 노쇼 판정, 책임비 환급까지 영향을 줄 수 있었습니다.',
            ],
          },
          {
            type: 'tabs',
            tabs: [
              {
                id: 'gps-state',
                label: 'GPS 인증 상태 불일치',
                title: '등록자는 한 명이지만 인증 상태는 Match마다 따로 존재했습니다.',
                text: '하나의 Post에 여러 신청자가 참여하면 신청자마다 Match와 MeetVerification이 생성됩니다.\n\n등록자는 모든 Match에서 동일한 사람이지만, 등록자의 장소 인증 상태는 각 MeetVerification에 저장됩니다.',
                hierarchy: {
                  parent: 'Post',
                  items: [
                    { label: 'Match A', value: '등록자 인증', tone: 'complete' },
                    { label: 'Match B', value: '등록자 미인증', tone: 'pending' },
                    { label: 'Match C', value: '등록자 미인증', tone: 'pending' },
                  ],
                  footer:
                    '등록자가 실제 장소 인증을 완료했더라도 특정 Match에만 결과가 기록되면 동일한 등록자가 Match마다 다른 인증 상태를 가질 수 있었습니다.',
                },
                cards: {
                  label: '중요한 이유',
                  columns: 2,
                  items: [
                    {
                      label: 'QR 진입 조건',
                      text: 'GPS 인증 상태는 QR 인증 단계로 넘어가기 전에 확인되는 서버 상태였습니다.',
                    },
                    {
                      label: '노쇼 판정 연결',
                      text: '다른 MeetVerification에 등록자 인증 시각이 남지 않으면 실제로 장소에 도착한 등록자가 등록자 노쇼로 잘못 판단될 수 있었습니다.',
                      tone: 'primary',
                    },
                  ],
                },
                callout: '등록자 1회의 장소 인증을 동일 Post의 모든 활성 Match에 어떻게 일관되게 반영할 것인가?',
                calloutTone: 'soft',
              },
              {
                id: 'qr-completion-unit',
                label: 'QR 공유 단위와 완료 단위',
                title: 'QR은 하나의 모임을 나타내지만 완료 상태는 신청자마다 달라야 했습니다.',
                text: '하나의 QR을 여러 신청자가 사용할 수 있지만, 한 신청자의 QR 인증 결과가 다른 신청자의 참석 상태까지 완료시키면 안 됐습니다.\n\n또한 한 신청자가 완료될 때마다 Post를 완료하는 것이 아니라, 모든 완료 대상 Match가 종료된 경우에만 전체 모임을 완료해야 했습니다.',
                hierarchy: {
                  parent: 'Post',
                  items: [
                    { label: 'Match A', value: '완료', tone: 'complete' },
                    { label: 'Match B', value: '대기', tone: 'pending' },
                    { label: 'Match C', value: '대기', tone: 'pending' },
                  ],
                  footer: 'QR은 Post 단위로 공유하고, 신청자 완료와 책임비 환급은 Match 단위로 처리',
                },
                cards: {
                  label: '설계 포인트',
                  columns: 2,
                  items: [
                    {
                      label: 'QR 공유 범위',
                      text: 'QR은 Post 범위에서 공유해 같은 식사 모임을 확인했습니다.',
                    },
                    {
                      label: '완료와 환급 범위',
                      text: '신청자 참석 완료와 신청자 책임비 환급은 Match 단위로 분리했습니다.',
                      tone: 'primary',
                    },
                  ],
                },
                callout: 'QR의 공유 범위와 신청자의 완료 처리 단위를 어떻게 분리할 것인가?',
                calloutTone: 'soft',
              },
            ],
          },
        ],
      },
      {
        number: '03',
        id: 'gps-verification',
        title: 'GPS 인증 설계',
        navTitle: 'GPS 인증 설계',
        navSubtitle: '역할별 인증 범위',
        lead: '등록자와 신청자의 GPS 인증 범위를 다르게 설계했습니다.',
        content: [
          {
            type: 'prose',
            paragraphs: [
              'GPS 인증은 단순히 현재 위치를 화면에 표시하는 기능이 아니라, QR 인증 진입과 노쇼 판정에 사용되는 서버 상태였습니다.',
              '따라서 사용자 역할과 그룹 매칭 구조에 따라 인증 상태가 반영되는 범위를 분리했습니다.',
            ],
          },
          {
            type: 'tabs',
            tabs: [
              {
                id: 'server-policy',
                label: '서버 인증 기준',
                title: '화면은 위치를 보여주고, 최종 인증 여부는 서버가 판단했습니다.',
                text: '서버는 참여자 권한, 노쇼/이의제기/확정 상태 차단, 인증 가능 시간, 중복 인증, 현재 좌표와 약속 장소 좌표, Haversine 거리 계산과 허용 반경을 확인한 뒤 등록자와 신청자 흐름을 분기했습니다.',
                cards: {
                  label: '인증 정책',
                  columns: 3,
                  items: [
                    {
                      label: '인증 시간',
                      text: '약속 시간 기준\n-10분 ~ +10분',
                    },
                    {
                      label: '인증 반경',
                      text: '서비스 기준 50m\n오차 허용 +10m\n→ 서버 판정 60m',
                      tone: 'primary',
                    },
                    {
                      label: '거리 계산',
                      text: '위도/경도 기반\nHaversine',
                    },
                  ],
                },
                supportCards: [
                  {
                    title: '왜 서버에서 판단했나요?',
                    text: '현재 좌표는 클라이언트에서 전달받지만, 인증 가능 시간, 참여자 권한, 중복 인증, 거리 기준은 서버 정책을 통과한 경우에만 상태가 변경되도록 구성했습니다.\n클라이언트는 좌표 전달과 화면 표시를 담당하고, 최종 인증 여부는 서버가 결정하도록 책임을 분리했습니다.',
                    items: [
                      { label: '클라이언트', value: '좌표 전달 / 화면 표시' },
                      { label: '서버', value: '정책 검증 / 상태 변경' },
                    ],
                  },
                ],
              },
              {
                id: 'role-scope',
                label: '등록자 / 신청자 처리 범위',
                title: '동일한 GPS 인증이라도 상태가 반영되는 범위를 역할별로 분리했습니다.',
                text: '그룹 매칭에서 신청자는 Match마다 다른 사용자지만, 등록자는 동일 Post의 모든 Match에서 같은 사용자입니다.\n\n따라서 신청자 인증은 자신의 Match에만 격리하고, 등록자 인증은 활성 Match 전체에 반영해야 동일한 등록자의 인증 상태가 Match마다 달라지지 않습니다.',
                cards: {
                  label: '역할별 처리 흐름',
                  columns: 2,
                  items: [
                    {
                      label: '등록자',
                      text: 'GPS 인증 1회\n→ 동일 Post의 활성 Match 조회\n→ MeetVerification 벌크 조회\n→ 모든 활성 Match의 MeetVerification에 등록자 인증 상태 반영',
                      tone: 'primary',
                    },
                    {
                      label: '신청자',
                      text: 'GPS 인증\n→ 자신의 Match\n→ 해당 MeetVerification만 인증',
                    },
                  ],
                },
                callout: '등록자 GPS 인증 1회 → 동일 Post의 모든 활성 Match에 인증 상태 반영\nMatch별 단건 조회 대신 → 활성 Match ID 기준으로 MeetVerification을 벌크 1회 조회',
                calloutTone: 'soft',
              },
              {
                id: 'kakao-maps',
                label: 'Kakao Maps 보조 구현',
                title: '프로토타입의 위치 표현을 실제 좌표 기반 인증 흐름으로 확장했습니다.',
                text: 'SVG 기반 위치 표현은 빠른 프로토타입에는 충분했지만, 실제 장소 검색과 서버 거리 검증까지 이어지는 좌표 흐름에는 한계가 있었습니다.\n\nKakao Maps와 Geolocation API는 사용자가 약속 장소와 현재 위치를 이해하도록 돕는 화면 역할을 맡고, 최종 인증 여부는 서버 거리 검증으로 판단했습니다.',
                flow: [
                  { title: '장소 검색', text: '약속 장소 선택' },
                  { title: '장소명/좌표 저장', text: '약속 장소명 / 위도 / 경도 저장' },
                  { title: 'Kakao Maps 표시', text: '선택한 장소를 지도에 표시' },
                  { title: '현재 위치 조회', text: 'Geolocation으로 현재 좌표 확인' },
                  { title: '서버 거리 검증', text: '50m 기준 + 오차 10m → 서버 60m 판정' },
                ],
                cards: {
                  label: '연결한 좌표 흐름',
                  columns: 3,
                  items: [
                    {
                      label: '장소 검색',
                      text: '사용자가 선택한 약속 장소명, 위도, 경도를 저장했습니다.',
                    },
                    {
                      label: '화면 표시',
                      text: '약속 장소와 현재 위치를 지도 위에서 확인하도록 연결했습니다.',
                    },
                    {
                      label: '서버 검증',
                      text: '저장된 약속 장소 좌표와 현재 좌표 사이의 거리를 서버에서 판단했습니다.',
                      tone: 'primary',
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
        id: 'qr-completion',
        title: 'QR 완료 설계',
        navTitle: 'QR 완료 설계',
        navSubtitle: '공유 QR과 Match 완료',
        lead: 'QR은 Post 범위에서 공유하고, 완료 상태는 신청자별 Match로 분리했습니다.',
        accent: ['Post', 'Match'],
        content: [
          {
            type: 'prose',
            paragraphs: [
              'QR 조회/스캔 초기 구현과 신청자별 완료 흐름 보완을 담당했으며, 그룹 매칭 대응 과정에서 Post 단위 공통 QR과 일부 완료 조건은 팀 단위 수정이 반영되어 현재 구조로 정리되었습니다.',
            ],
          },
          {
            type: 'tabs',
            tabs: [
              {
                id: 'verification',
                label: 'QR 발급과 검증',
                title: 'QR 토큰은 DB에 저장하고, 스캔 전 서버 조건을 다시 확인했습니다.',
                text: '토큰은 hp_qr_ 접두사 뒤에 하이픈을 제거한 UUID 문자열을 붙여 생성하고, 만남 인증 정보의 QR 토큰으로 저장했습니다.\n발급 시각 기준 10분 동안 유효하며, 신청자가 스캔할 때 서버에서 QR 인증 가능 조건을 다시 확인했습니다.',
                cards: {
                  columns: 3,
                  items: [
                    {
                      label: '토큰 형식',
                      text: 'hp_qr_ + UUID\n실제 UUID 문자열은 - 제거',
                    },
                    {
                      label: '저장 위치',
                      text: '만남 인증 정보의 QR 토큰\nDB에 저장',
                      tone: 'primary',
                    },
                    {
                      label: '만료 기준',
                      text: '발급 시각 + 10분\n만료된 QR은 완료 처리 차단',
                    },
                  ],
                },
                callout: '신청자 권한, GPS 선행 인증, QR 토큰 존재 여부, 토큰 일치, 토큰 만료, 기존 완료 상태를 확인한 뒤 완료 흐름으로 진입했습니다.',
                calloutTone: 'soft',
              },
              {
                id: 'match-completion',
                label: '신청자별 완료',
                title: 'QR 스캔 결과는 해당 신청자의 Match만 완료했습니다.',
                text: 'QR은 하나의 식사 모임을 확인하는 수단이지만, 참석 여부와 책임비 처리는 신청자별 결과입니다.\nQR과 완료 상태를 같은 단위로 처리하면 한 신청자의 인증이 다른 신청자의 상태까지 변경할 수 있어, 공유 범위와 완료 처리 단위를 분리했습니다.',
                flow: [
                  { title: 'QR 스캔', text: '신청자 QR 인증 시작' },
                  { title: '만남 인증 완료', text: '해당 신청자의 인증 1건 완료' },
                  { title: '위치 데이터 삭제', text: '해당 Match 위치 정보 정리' },
                  { title: '신청자 Match 완료', text: '신청자 Match 종료', tone: 'primary' },
                  { title: '신청자 책임비 환급', text: '해당 신청자만 환급' },
                ],
                cards: {
                  label: '완료 단위',
                  columns: 2,
                  items: [
                    {
                      label: '모임을 나타내는 범위',
                      text: 'QR은 Post 범위에서 공유해 같은 식사 모임을 확인했습니다.',
                    },
                    {
                      label: '개인의 참여 결과',
                      text: 'QR 스캔 1회는 MeetVerification 1건과 Match 1건만 완료합니다.\n다른 신청자의 Match에는 영향을 주지 않습니다.',
                      tone: 'primary',
                    },
                  ],
                },
                callout: 'QR 공유 범위는 Post, 신청자 완료와 책임비 환급은 Match 단위로 분리했습니다.',
                calloutTone: 'soft',
              },
              {
                id: 'post-completion',
                label: 'Post 최종 완료',
                title: '모든 완료 대상 Match가 종료된 뒤에만 Post를 완료했습니다.',
                text: '해당 Match를 완료한 뒤 남은 완료 대상 Match가 있는지 확인했습니다.\n남은 대상이 있으면 Post는 유지하고, 더 이상 완료 대상이 없을 때만 Post 최종 완료, 등록자 책임비 환급, 채팅방 비활성화 예약으로 이어집니다.',
                flow: [
                  { title: 'Match 완료', text: '신청자별 완료 반영' },
                  { title: '남은 Match 확인', text: '완료 대상 존재 여부 확인' },
                  { title: 'Post 최종 완료', text: '남은 완료 대상이 없을 때만', tone: 'primary' },
                  { title: '등록자 책임비 환급', text: 'Post 완료 후 진행' },
                  { title: '채팅방 비활성화 예약', text: '후속 정리 작업 예약' },
                ],
                cards: {
                  columns: 2,
                  items: [
                    {
                      label: 'Post 유지',
                      text: '아직 종료되지 않은 완료 대상 Match가 있으면 전체 모임 상태는 유지합니다.',
                    },
                    {
                      label: 'Post 완료',
                      text: '남은 완료 대상 Match가 없을 때만 전체 Post 완료와 등록자 책임비 환급으로 이어집니다.',
                      tone: 'primary',
                    },
                  ],
                },
                callout: '모든 완료 대상 Match가 종료되기 전에는 Post를 최종 완료 처리하지 않습니다.\n완료 대상 Match 판단 일부는 팀 단위 후속 수정이 반영되어 현재 구조로 정리되었습니다.',
                calloutTone: 'soft',
              },
            ],
          },
        ],
      },
      {
        number: '05',
        id: 'reliability',
        title: '안정성 및 후속 처리',
        navTitle: '안정성 및 후속 처리',
        navSubtitle: '중복 방어와 정리',
        lead: '완료 이후의 중복 처리와 상태 정합성까지 함께 고려했습니다.',
        content: [
          {
            type: 'tabs',
            tabs: [
              {
                id: 'duplicate-defense',
                label: '중복 완료 / 환급 방어',
                title: '완료와 환급이 중복 실행되지 않도록 단계별로 상태와 정산 이력을 확인했습니다.',
                text: 'QR 완료 요청은 반복 입력이나 네트워크 재요청으로 다시 들어올 수 있습니다.\n완료 이후에는 Match 상태 변경뿐 아니라 책임비 환급까지 이어지므로, 각 단계에서 기존 상태와 정산 여부를 다시 확인했습니다.',
                reliabilityRows: {
                  columns: [
                    {
                      title: '신청자 Match 단위',
                      rows: [
                        { label: '01 만남 인증 상태', text: '활성 MeetVerification 묶음 비관락 조회 → 기존 만남 인증 완료 상태 확인' },
                        { label: '02 Match', text: '비관락 조회 → 기존 완료 상태 확인' },
                        { label: '03 신청자 정산', text: '최신 책임비 정산 이력 확인 → 이미 환급된 경우 생략 → 신청자 책임비 환급' },
                        { label: '04 결과', text: '중복 완료 및 중복 환급 방지' },
                      ],
                    },
                    {
                      title: 'Post 단위',
                      rows: [
                        { label: '01 Post', text: '비관락 조회' },
                        { label: '02 완료 가능 여부', text: '남은 완료 대상 Match 확인' },
                        { label: '03 상태 확인', text: '기존 Post 완료 여부 확인' },
                        { label: '04 등록자 정산', text: '최신 책임비 정산 이력 확인 → 이미 환급된 경우 생략 → 등록자 책임비 환급' },
                      ],
                    },
                  ],
                },
                callout: 'QR 스캔 단계에서는 활성 MeetVerification을 먼저 비관락으로 조회해 동일 신청자의 중복 완료를 방어했습니다.\n이후 Match, Post, 책임비 정산 단계에서도 각 도메인의 상태와 최신 정산 이력을 다시 확인하도록 연결해 동일 요청의 중복 처리 가능성을 줄였습니다.',
                calloutTone: 'soft',
              },
              {
                id: 'location-cleanup',
                label: '위치 데이터 정리',
                title: '인증에 사용한 위치 데이터는 처리 이후 정리했습니다.',
                text: '위치 정보는 GPS 장소 인증과 QR 만료 이후의 위치 판정에 필요한 동안만 사용하고, 각 Match에서 더 이상 필요하지 않은 시점에 정리했습니다.',
                locationCleanup: {
                  lifecycleTitle: '위치 데이터 처리 흐름',
                  steps: [
                    {
                      label: '01',
                      title: '인증 완료 상태 반영',
                      text: 'QR 인증 성공 결과를 해당 신청자의 만남 인증 상태에 먼저 반영합니다.',
                    },
                    {
                      label: '02',
                      title: '해당 Match 위치 정리',
                      text: '다른 신청자의 위치 정보에는 영향을 주지 않도록 완료된 신청자의 Match에 해당하는 위치 데이터만 정리합니다.',
                      tone: 'primary',
                    },
                    {
                      label: '03',
                      title: '완료 흐름 계속',
                      text: '위치 데이터 정리 이후에도 Match 완료와 신청자 책임비 환급 등 후속 처리는 계속 진행됩니다.',
                    },
                  ],
                  reasonTitle: '위치 정보가 필요한 시점',
                  reasons: [
                    {
                      title: 'GPS 노쇼 판정',
                      text: 'GPS 노쇼는 최신 위치를 다시 조회하지 않고, 인증 가능 시간 안에 기록된 등록자와 신청자의 장소 인증 완료 여부를 사용합니다. 판정 이후 해당 Match의 위치 데이터를 정리합니다.',
                    },
                    {
                      title: 'QR 노쇼 판정',
                      text: 'QR 만료 이후에는 15초 이내 갱신된 최신 위치와 서버 판정 범위 60m 여부를 확인하고, 필요 시 이탈 정보를 사용해 판정한 뒤 해당 Match의 위치 데이터를 정리합니다.',
                    },
                  ],
                  callout:
                    'GPS 노쇼는 이미 기록된 장소 인증 결과를 사용하고, QR 노쇼는 만료 이후의 최신 위치를 사용합니다.\n위치 데이터는 각 Match의 판단이 끝난 뒤 더 이상 필요하지 않은 시점에 정리했습니다.',
                },
              },
              {
                id: 'gps-noshow',
                label: 'GPS 노쇼 판정',
                title: 'GPS 인증 결과를 기준으로 미인증 사용자의 노쇼 여부를 판단했습니다.',
                text: 'GPS 노쇼는 최신 위치를 다시 계산하지 않고, 인증 가능 시간이 끝난 뒤 서버가 이미 기록한 장소 인증 완료 여부를 기준으로 판단했습니다.',
                noShowDecision: {
                  callout:
                    'GPS 노쇼는 인증 가능 시간이 종료된 뒤의 장소 인증 결과를 기준으로 판단했습니다.\n노쇼 예정 상태 반영 이후 이의제기 가능 시간을 거쳐, 책임비 정산은 24시간 이후 확정 단계로 분리했습니다.',
                  columns: [
                    {
                      title: 'GPS 노쇼',
                      policy: '',
                      information: [],
                      outcomes: [],
                      sections: [
                        {
                          heading: '언제 판단하나요?',
                          text: '약속 시간 또는 연장된 만남 시간을 기준으로 GPS 인증 가능 시간이 종료됐지만, 장소 인증이 완료되지 않은 만남을 대상으로 판단합니다.',
                        },
                        {
                          heading: '무엇을 확인하나요?',
                          text: '장소 인증은 서비스 기준 50m에 GPS 오차 허용 10m를 포함한 서버 판정 범위 60m로 결정됩니다.\nGPS 노쇼는 최신 위치나 현재 거리를 다시 계산하지 않고, 인증 가능 시간 안에 장소 인증을 완료했는지를 기준으로 판단합니다.',
                          items: ['등록자 장소 인증 완료 여부', '신청자 장소 인증 완료 여부'],
                        },
                        {
                          heading: '어떻게 판단하나요?',
                          outcomes: [
                            { condition: '양측 모두 장소 인증 미완료', result: '양측 노쇼' },
                            { condition: '등록자만 장소 인증 미완료', result: '등록자 노쇼' },
                            { condition: '신청자만 장소 인증 미완료', result: '신청자 노쇼' },
                            { condition: '양측 모두 장소 인증 완료', result: 'GPS 노쇼 대상 아님' },
                          ],
                        },
                        {
                          heading: '판정 이후에는?',
                          text: '노쇼 예정 상태 반영 → 알림 / 채팅 제한 등 후속 처리 → 이의제기 가능 시간 → 24시간 이후 확정 단계에서 책임비 정산으로 이어집니다.',
                        },
                      ],
                    },
                  ],
                },
              },
              {
                id: 'qr-noshow',
                label: 'QR 노쇼 판정',
                title: 'QR 만료 후에는 완료 상태를 다시 확인하고 최신 위치를 기준으로 노쇼를 판단했습니다.',
                text: 'QR 인증이 완료되지 않은 Match는 만료 이후 상태를 재확인하고, 15초 이내 최신 위치와 이탈 정보를 기준으로 노쇼 유형을 판단했습니다.',
                noShowDecision: {
                  callout:
                    'QR 노쇼는 QR 만료만으로 바로 확정하지 않고 완료 상태, Match 상태, 최신 위치를 다시 확인했습니다.\n판정 직후에는 노쇼 예정 상태만 반영하고, 책임비 정산은 24시간 이후 확정 단계로 분리했습니다.',
                  columns: [
                    {
                      title: 'QR 노쇼',
                      policy: '',
                      information: [],
                      outcomes: [],
                      sections: [
                        {
                          heading: '언제 판단하나요?',
                          text: 'GPS 장소 인증까지 완료된 상태에서 QR 발급 후 10분 안에 QR 인증을 완료하지 않은 Match를 노쇼 후보로 확인합니다.\n스케줄러가 1분 주기로 QR 만료 대상을 확인합니다.',
                        },
                        {
                          heading: '먼저 무엇을 확인하나요?',
                          text: 'QR이 만료됐더라도 이미 완료된 만남이나 종료된 Match는 다시 노쇼 처리하지 않도록 제외합니다.',
                          items: [
                            'QR 노쇼 후보 상태와 QR 만료 시각',
                            '만남 완료 여부와 Match 진행 상태',
                            '15초 이내 갱신된 최신 위치',
                            '서버 판정 범위 60m 이내 여부',
                            '필요 시 약속 장소를 먼저 벗어난 사용자',
                          ],
                        },
                        {
                          heading: '어떻게 판단하나요?',
                          text: "15초 이내 갱신된 위치가 있고 서버 판정 범위 60m 안에 있을 때 반경 내 확인으로 판단합니다. 위치가 없거나, 15초보다 오래됐거나, 실제 반경 밖이면 모두 '반경 내 확인되지 않음'으로 처리합니다.",
                          outcomes: [
                            { condition: '등록자 반경 내 확인 / 신청자 확인 불가', result: '신청자 노쇼' },
                            { condition: '신청자 반경 내 확인 / 등록자 확인 불가', result: '등록자 노쇼' },
                            { condition: '양측 모두 유효한 최신 위치가 반경 안에서 확인', result: '양측 노쇼' },
                            { condition: '양측 모두 유효한 최신 위치가 반경 안에서 확인되지 않음', result: '이탈 시각과 마지막 반경 내 체류 시각으로 먼저 이탈한 사용자 판정' },
                            { condition: '이탈 순서 판단 불가', result: '양측 노쇼' },
                          ],
                        },
                        {
                          heading: '판정 이후에는?',
                          text: '노쇼 예정 상태 반영 → 채팅 제한 및 노쇼 예정 알림 → 해당 Match 위치 데이터 정리 → 24시간 이후 확정 단계에서 책임비 정산으로 이어집니다.',
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        number: '06',
        id: 'limitations',
        title: '한계 및 개선 방향',
        navTitle: '한계 및 개선 방향',
        navSubtitle: '구현 이후 다시 본 개선점',
        lead: '구현 이후 인증 구조에 남아 있는 기술적 한계와 개선 방향을 정리했습니다.',
        content: [
          {
            type: 'prose',
            paragraphs: [
              'GPS와 QR 인증은 실제 서비스 흐름에서 정상 동작했지만, 공통 QR과 브라우저 GPS를 사용하는 구조에는 토큰 재사용과 좌표 신뢰 측면의 한계가 남습니다.',
              '그 한계를 줄이기 위해 검토할 수 있는 개선 방향을 정리했습니다.',
            ],
          },
          {
            type: 'tabs',
            tabs: [
              {
                id: 'common-qr',
                label: '공통 QR의 재사용 범위',
                title: 'Post 공통 QR은 편의성을 높였지만 토큰의 사용 범위도 넓어졌습니다.',
                limitation: {
                  current: [
                    '한끼팟 그룹 매칭에서는 하나의 Post에 여러 신청자 Match가 존재합니다. 등록자가 신청자마다 서로 다른 QR을 표시하지 않아도 되도록, 같은 Post의 활성 Match들이 하나의 QR 토큰을 공유하도록 설계했습니다.',
                    '등록자는 Post의 공통 QR 하나를 표시하고, 각 신청자는 자신의 Match에서 해당 QR을 스캔합니다. 현재 QR 토큰은 발급 후 10분 동안 유효합니다.',
                    '이 구조는 등록자가 여러 신청자를 만나더라도 QR을 하나만 제시하면 되므로 그룹 매칭 UX를 단순하게 유지할 수 있습니다.',
                    '다만 공통 QR은 특정 신청자나 특정 Match에만 귀속된 토큰이 아닙니다. 유효 시간 동안 QR 화면이나 토큰 값이 캡처 / 저장 / 전달되는 경우, QR 토큰 자체의 공유와 재사용 가능성을 QR만으로 차단하지는 못합니다.',
                  ],
                  improvement: [
                    'Post 공통 QR UX는 유지하되 화면에 표시되는 실제 인증 토큰을 더 짧은 주기로 교체하고, 이전 토큰을 폐기하는 방식을 고려할 수 있습니다.',
                    '토큰 회전 역시 QR 공유 자체를 없애는 것은 아니므로, 노출된 토큰이 유효하게 재사용될 수 있는 시간을 줄이는 보완책으로 검토할 수 있습니다.',
                    'QR 발급과 토큰 회전 정책이 복잡해진다면 현재 유효 토큰, 발급 시각, 만료 시각, 폐기 여부, 회전 버전을 별도의 QR 세션 또는 QR 발급 엔티티로 관리하는 구조적 선택지도 검토할 수 있습니다.',
                  ],
                  chips: ['Post 공통 QR', '10분 TTL', 'Post 범위 공유'],
                },
              },
              {
                id: 'gps-coordinate',
                label: 'GPS 좌표의 신뢰성',
                title: '서버 거리 검증만으로 GPS 좌표 자체의 위변조까지 확인할 수는 없습니다.',
                limitation: {
                  current: [
                    '현재 장소 인증에서는 브라우저 Geolocation API로 위도 / 경도를 얻고 해당 좌표를 서버로 전달합니다.',
                    '서버는 클라이언트가 계산한 인증 결과를 신뢰하지 않고, 전달받은 좌표와 약속 장소 좌표 사이의 거리를 Haversine 공식으로 직접 계산합니다.',
                    '서비스 기준은 50m, GPS 오차 허용 10m를 포함한 서버 판정 범위는 60m입니다. 클라이언트가 전달한 인증 성공 여부를 그대로 신뢰하지 않고, 전달된 좌표를 기준으로 최종 인증 여부를 서버가 결정하도록 구성했습니다.',
                    '하지만 GPS spoofing(위치 위변조)처럼 좌표 자체가 조작된 경우에는 현재 서버 거리 검증만으로 좌표 출처의 진위까지 직접 확인하기 어렵습니다.',
                  ],
                  improvement: [
                    'Geolocation API의 위치 정확도 값을 함께 참고해 현재 위치 측정값의 오차 범위를 추가 판단하는 방안을 검토할 수 있습니다.',
                    '짧은 시간 안에 현실적으로 이동하기 어려운 거리 변화가 발생하는지 확인하는 보조 신호로 활용할 수 있습니다.',
                    '인증 순간의 단일 좌표뿐 아니라 직전 일정 구간의 위치 변화가 자연스러운지 함께 확인하는 방향을 고려할 수 있습니다.',
                    '짧은 시간 동안 서로 다른 위치에서 반복 인증이 발생하는 경우 추가 확인이나 제한 정책을 적용할 수 있는지 검토할 수 있습니다.',
                    '네트워크 기반 위치는 정확도가 낮기 때문에 GPS를 대체하기보다는, GPS 좌표와 크게 모순되는 상황을 확인하는 보조 신호로 활용하는 방안을 검토할 수 있습니다.',
                    '추가 위치 신호를 활용할 경우 수집 데이터와 판단 복잡도도 증가할 수 있으므로, 실제 적용 시 필요한 신호와 보관 범위를 함께 검토할 필요가 있습니다.',
                  ],
                  chips: ['위치 정확도', '이동 패턴', '연속 위치', '반복 인증'],
                },
              },
              {
                id: 'distance-policy',
                label: '거리 판정 기준 고도화',
                title: '고정된 거리 값만으로는 기기별 GPS 측위 품질 차이를 반영하기 어렵습니다.',
                limitation: {
                  current: [
                    '좌표가 정상적으로 수집되더라도 기기와 주변 환경에 따라 GPS 측위 정확도는 달라질 수 있습니다.',
                    '한끼팟에서 필요한 것은 도보 경로 거리가 아니라 사용자가 약속 장소 근처에 있는지를 판단하는 것입니다. 따라서 외부 지도 API 없이 두 GPS 좌표 사이의 거리를 계산하는 Haversine은 현재 목적에 적합한 선택입니다.',
                    '현재 서버는 Haversine으로 계산한 거리가 60m 이내인지 동일한 기준으로 판단합니다. 현재 개선 대상으로는 거리 공식 자체를 교체하기보다, 기기와 환경에 따라 달라지는 GPS 측위 품질을 판정에 함께 반영하는 방향을 우선 검토할 수 있습니다.',
                    '예를 들어 개념적으로 거리 52m / 위치 정확도 ±5m인 사용자와 거리 52m / 위치 정확도 ±30m인 사용자는 거리값만 보면 동일하게 판단됩니다. 하지만 실제 위치 데이터의 신뢰도는 서로 다를 수 있습니다.',
                    '고정 60m 기준은 구현이 단순하고 모든 요청에 일관된 정책을 적용할 수 있다는 장점이 있지만, 기기 / 건물 / 실내외 환경에 따른 GPS 측위 품질 차이를 반영하기 어렵습니다.',
                  ],
                  improvement: [
                    'Haversine 계산 자체를 교체하기보다 거리, 위치 정확도, 최근 위치 샘플, 위치 갱신 시간을 함께 참고하는 판정 정책을 검토할 수 있습니다.',
                    '판정 신뢰도가 낮은 경우에는 반경을 단순히 확대하는 대신, 재측정이나 추가 확인을 요청하는 방안도 검토할 수 있습니다.',
                    '조합별 자동 테스트를 추가해 정책 변경 시 영향 범위와 회귀 가능성을 확인하는 데 활용할 수 있습니다.',
                  ],
                  chips: ['현재: 거리 <= 60m', '개선: 거리 + 위치 정확도 + 최근 위치'],
                },
              },
            ],
          },
          {
            type: 'callout',
            text: '공통 QR의 재사용 가능 시간을 줄이기 위한 토큰 회전을 검토하고, GPS 인증은 거리뿐 아니라 위치 정확도와 연속적인 위치 신호를 함께 참고하는 방향으로 고도화하는 방안을 검토할 수 있습니다.',
          },
        ],
      },
      {
        number: '07',
        id: 'demo',
        title: '시연 영상',
        navTitle: '시연 영상',
        navSubtitle: '동작 흐름 확인',
        lead: '설계한 인증과 완료 흐름이 실제 서비스에서 어떻게 이어지는지 확인할 수 있습니다.',
        content: [
          {
            type: 'prose',
            paragraphs: [
              '게시글 생성과 매칭 이후 GPS 장소 인증 → QR 만남 인증 → Match 완료까지 실제 사용자 화면에서 이어지는 흐름을 확인할 수 있습니다.',
              '핵심 인증 흐름은 서비스 로직과 실제 시연 흐름에서 동작을 확인했습니다.',
            ],
          },
          {
            type: 'video',
            src: '/hankkipot-demo.mp4',
            poster: '/hankkipot-verification-hero.png',
            mimeType: 'video/mp4',
            title: '한끼팟 주요 사용 흐름 시연',
            description: '게시글 생성과 매칭부터 GPS 인증, QR 인증, Match 완료까지 이어지는 흐름입니다.',
          },
        ],
      },
    ],
  };
