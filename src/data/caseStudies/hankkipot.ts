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
            '한끼팟은 같은 대학의 학생들이 함께 식사할 사람을 모집하고,\n실제 만남까지 인증하는 서비스입니다.',
            '저는 GPS 장소 인증과 QR 만남 인증, 위치 정보 처리를 담당하고,\n인증 결과가 신청자별 Match 완료로 이어지며 모든 완료 대상 Match가 종료된 경우\nPost 완료와 등록자 환급 흐름으로 연결되도록 구성했습니다.',
            '특히 여러 신청자가 하나의 Post에 참여하는 그룹 매칭에서 등록자의 장소 인증 상태가\n모든 Match에 일관되게 반영되어야 하는 문제와, 하나의 QR을 공유하면서도 완료 상태는 신청자별로 분리해야 하는 문제를 중심으로 작업했습니다.',
          ],
          scope: ['서버 기준 GPS 인증', 'Post 단위 QR', '신청자별 Match 완료 연결', 'Post 완료 및 등록자 환급 흐름 연결'],
        },
      ],
    },
    {
      number: '02',
      id: 'problem',
      title: '문제 정의',
      navTitle: '문제 정의',
      navSubtitle: '인증과 완료의 처리 단위',
      lead: '그룹 매칭에서는 인증 결과의 반영 범위와 완료 처리 단위를 역할에 맞게 분리해야 했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            '하나의 Post에 여러 신청자의 Match가 연결되면서 등록자의 GPS 인증은 여러 Match에 함께 반영되어야 했고,\n신청자의 인증 결과와 완료 상태는 자신의 Match를 기준으로 처리되어야 했습니다.',
            '또한 QR은 Post 단위로 공유하되, 신청자별 완료와 책임비 환급은 Match 단위로 구분할 필요가 있었습니다.',
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              id: 'gps-state',
              label: 'GPS 인증 반영 범위',
              title: '등록자 GPS 인증은 한 번의 인증 결과를 같은 Post의 활성 Match에 일관되게 반영해야 했습니다.',
              text: '하나의 Post에 여러 신청자가 참여하면 신청자마다 Match와 MeetVerification이 생성됩니다.\n\n등록자는 모든 Match에서 동일한 사용자이므로,\n한 번의 장소 인증 결과가 특정 MeetVerification에만 남으면 같은 Post 안에서도 Match마다 등록자 인증 상태가 달라질 수 있습니다.',
              hierarchy: {
                parent: 'Post',
                items: [
                  { label: 'Match A', value: '등록자 인증', tone: 'complete' },
                  { label: 'Match B', value: '등록자 미인증', tone: 'pending' },
                  { label: 'Match C', value: '등록자 미인증', tone: 'pending' },
                ],
                footer:
                  '등록자 GPS 인증 결과는 같은 Post의 모든 활성 Match에 일관되게 반영',
              },
              cards: {
                label: '영향 범위',
                columns: 2,
                items: [
                  {
                    label: 'QR 진입 조건',
                    text: 'QR 인증은 GPS 장소 인증 완료 상태를 전제로 진행되므로,\n등록자 인증 결과가 같은 Post의 활성 Match에 일관되게 반영될 필요가 있었습니다.',
                  },
                  {
                    label: '노쇼 판정 연결',
                    text: '등록자 인증 결과가 일부 MeetVerification에만 남으면 같은 등록자가 Match마다\n다른 장소 인증 상태를 갖게 되어 이후 노쇼 판정에도 영향을 줄 수 있습니다.',
                    tone: 'primary',
                  },
                ],
              },
            },
            {
              id: 'qr-completion-unit',
              label: 'QR 공유 / 완료 단위',
              title: 'QR은 Post 단위로 공유하고, 신청자 완료와 책임비 환급은 Match 단위로 구분해야 했습니다.',
              text: '하나의 QR을 여러 신청자가 함께 사용하더라도, QR 스캔 결과는 해당 신청자의 Match에만 반영되어야 했습니다.\n또한 한 신청자의 완료가 전체 Post 완료로 이어지지 않도록, 같은 Post의 완료 대상 Match가 모두 종료된 시점을 전체 모임의 완료 시점으로 판단해야 했습니다.',
              hierarchy: {
                parent: 'Post',
                items: [
                  { label: 'Match A', value: '완료', tone: 'complete' },
                  { label: 'Match B', value: '대기', tone: 'pending' },
                  { label: 'Match C', value: '대기', tone: 'pending' },
                ],
                footer: 'QR 공유 범위는 Post, 신청자 완료와 책임비 환급은 Match 단위로 구분',
              },
              cards: {
                label: '처리 단위',
                columns: 2,
                items: [
                  {
                    label: 'QR 공유 범위',
                    text: 'QR은 하나의 식사 모임을 확인하는 용도이므로 Post 단위로 공유할 필요가 있었습니다.',
                  },
                  {
                    label: '완료와 환급 범위',
                    text: '신청자의 참석 완료와 책임비 환급은 다른 신청자의 상태에 영향을 주지 않도록\nMatch 단위로 구분할 필요가 있었습니다.',
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
      number: '03',
      id: 'gps-verification',
      title: 'GPS 인증 설계',
      navTitle: 'GPS 인증 설계',
      navSubtitle: '역할별 반영 범위',
      lead: '기존 그룹 전파 흐름을 활성 Match 기준으로 정리하고, 등록자와 신청자의 인증 처리 범위를 구분해 보완했습니다.',
      content: [
        {
          type: 'prose',
          paragraphs: [
            'GPS 인증 결과는 QR 인증 진입 조건과 이후 노쇼 판정에도 사용되기 때문에, 서버에서 어떤 범위까지 인증 상태를 반영할지 구분할 필요가 있었습니다.',
            '이에 기존 그룹 전파 흐름을 활성 Match 기준으로 정리하고, 등록자와 신청자의 역할, Post와 Match 구조에 맞춰 GPS 인증 결과의 반영 범위를 구분해 보완했습니다.',
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              id: 'server-policy',
              label: '서버 인증 기준',
              title: '클라이언트는 위치를 표시하고, 인증 가능 여부는 서버에서 다시 판단했습니다.',
              text: '서버에서는 참여자 권한, 인증 가능 시간, 기존 인증 상태와 진행 상태를 먼저 확인했습니다.\n\n이후 전달받은 현재 좌표와 약속 장소 좌표의 거리를 Haversine 공식으로 다시 계산해 서버 판정 기준 60m 충족 여부를 확인했습니다.',
              cards: {
                label: '인증 정책',
                columns: 3,
                items: [
                  {
                    label: '인증 시간',
                    text: '약속 시간 기준 -10분 ~ +10분',
                  },
                  {
                    label: '인증 반경',
                    text: '현재 좌표와 약속 장소 좌표 사이의 거리가\n60m 이내인지 서버에서 확인',
                    tone: 'primary',
                  },
                  {
                    label: '거리 계산',
                    text: '위도/경도 좌표를 기준으로 Haversine 거리 계산',
                  },
                ],
              },
              supportCards: [
                {
                  title: '서버 판정 기준',
                  text: '클라이언트는 현재 좌표 전달과 화면 표시를 담당하고, 인증 가능 시간, 참여자 권한, 중복 인증 여부와 거리 기준은 서버에서 다시 확인하도록 구성했습니다.\n클라이언트의 판단 결과를 그대로 사용하지 않고, 서버 정책을 통과한 경우에만 인증 상태가 변경되도록 역할을 나눴습니다.',
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
              title: '기존 그룹 전파 흐름에서 등록자와 신청자의 GPS 인증 결과 반영 범위를 구분해 보완했습니다.',
              text: '신청자는 Match마다 서로 다른 사용자이지만, 등록자는 같은 Post의 모든 Match에서 동일한 사용자입니다.\n\n따라서 신청자의 인증 결과는 자신의 Match에만 반영하고, 등록자의 인증 결과는 같은 Post의 활성 Match 전체에 반영하도록 구분했습니다.',
              cards: {
                label: '역할별 처리 흐름',
                columns: 2,
                items: [
                  {
                    label: '등록자',
                    text: 'GPS 인증 1회 후 같은 Post의 활성 Match를 조회하고,\n각 MeetVerification에 등록자 인증 상태를 일괄 반영',
                    tone: 'primary',
                  },
                  {
                    label: '신청자',
                    text: 'GPS 인증 결과를 자신의 Match와 해당 MeetVerification에만 반영',
                  },
                ],
              },
              callout: '등록자 GPS 인증 1회로 같은 Post의 모든 활성 Match에 인증 상태를 반영했습니다.\nMatch별 단건 조회 대신 활성 Match ID를 기준으로 MeetVerification을 한 번에 조회했습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'kakao-maps',
              label: 'Kakao Maps 보조 구현',
              title: '프로토타입의 위치 표현을 실제 좌표를 사용하는 GPS 인증 흐름으로 확장했습니다.',
              text: 'Kakao Maps는 약속 장소를 표시하는 데 사용하고, Geolocation API로 현재 위치의 좌표를 조회했습니다.\n\n실제 인증 여부는 서버에서 약속 장소 좌표와 현재 좌표 사이의 거리를 다시 계산해 판정했습니다.',
              flow: [
                { title: '장소 검색', text: '약속 장소 선택' },
                { title: '장소명/좌표 저장', text: '약속 장소명 / 위도 / 경도 저장' },
                { title: 'Kakao Maps 표시', text: '선택한 장소를 지도에 표시' },
                { title: '현재 위치 조회', text: 'Geolocation으로 현재 좌표 확인' },
                { title: '서버 거리 검증', text: '현재 좌표와 약속 장소 좌표의 거리 계산 → 서버 기준 60m 판정' },
              ],
              cards: {
                label: '연결한 좌표 흐름',
                columns: 3,
                items: [
                  {
                    label: '장소 검색',
                    text: '선택한 약속 장소명과 위도/경도를 저장했습니다.',
                  },
                  {
                    label: '화면 표시',
                    text: '약속 장소와 현재 위치를\nKakao Maps에서 확인할 수 있도록 표시했습니다.',
                  },
                  {
                    label: '서버 검증',
                    text: '서버에서 두 좌표 사이의 거리를 계산해\n인증 범위 충족 여부를 판정했습니다.',
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
      lead: 'QR은 하나의 Post에서 공유하고, 완료 처리는 신청자별 Match 단위로 분리했습니다.',
      accent: ['Post', 'Match'],
      content: [
        {
          type: 'prose',
          paragraphs: [
            'QR 조회와 스캔, 신청자별 완료 처리를 구현하고, 그룹 매칭 대응 과정에서 Match 중심 QR 구조를 Post 단위 공통 QR로 전환했습니다.',
            '또한 신청자별 Match 완료와 Post 완료 처리를 분리해 현재 흐름으로 정리했습니다.',
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              id: 'verification',
              label: 'QR 발급과 검증',
              title: 'QR 토큰은 DB에 저장하고, 스캔 시 서버에서 인증 조건을 다시 확인했습니다.',
              text: 'QR 토큰은 hp_qr_ 접두사와 하이픈을 제거한 UUID 문자열을 조합해 생성하고, MeetVerification의 QR 토큰 필드에 저장했습니다.\n새로 발급한 QR 토큰은 발급 시각부터 10분간 유효하며, 신청자가 스캔할 때 서버에서 인증 조건을 다시 확인하도록 구성했습니다.',
              cards: {
                columns: 3,
                items: [
                  {
                    label: '토큰 형식',
                    text: 'hp_qr_ + UUID, UUID의 하이픈은 제거',
                  },
                  {
                    label: '저장 위치',
                    text: 'MeetVerification QR 토큰 필드에 저장',
                    tone: 'primary',
                  },
                  {
                    label: '만료 기준',
                    text: '새로 발급한 QR 토큰은 발급 시각부터\n10분 만료된 QR은 완료 처리 차단',
                  },
                ],
              },
              callout: '신청자 권한과 GPS 선행 인증을 확인하고, QR 토큰의 존재 여부, 일치 여부, 만료 여부와 기존 완료 상태까지 검증한 뒤 완료 처리로 이어지도록 구성했습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'match-completion',
              label: '신청자별 완료',
              title: 'QR 스캔 성공 시 해당 신청자의 Match만 완료하도록 분리했습니다.',
              text: 'QR은 같은 Post의 식사 모임을 확인하는 용도로 공유하지만, 참석 결과와 책임비 정산은 신청자별로 달라집니다.\n한 신청자의 QR 스캔이 다른 신청자의 Match 완료 상태까지 함께 변경하지 않도록 QR 공유 범위와 완료 처리 단위를 분리했습니다.',
              flow: [
                { title: 'QR 스캔', text: '신청자가 등록자 QR 스캔' },
                { title: '만남 인증 완료', text: '해당 신청자의 만남 인증 완료' },
                { title: '위치 데이터 삭제', text: '해당 Match의 위치 정보 삭제' },
                { title: '신청자 Match 완료', text: '해당 신청자의 Match 완료', tone: 'primary' },
                { title: '신청자 책임비 환급', text: '해당 신청자 책임비 환급' },
              ],
              cards: {
                label: '완료 단위',
                columns: 2,
                items: [
                  {
                    label: 'QR 공유 범위',
                    text: '하나의 Post에 참여한 신청자들이 같은 QR을 사용하도록 Post 단위로 공유했습니다.',
                  },
                  {
                    label: '신청자별 완료 범위',
                    text: 'QR 스캔 1회는 해당 신청자의 MeetVerification과 Match만 완료합니다.\n다른 Match의 완료 상태를 함께 변경하지 않습니다.',
                    tone: 'primary',
                  },
                ],
              },
            },
            {
              id: 'post-completion',
              label: 'Post 최종 완료',
              title: '남은 완료 대상 Match가 없을 때만 Post를 최종 완료했습니다.',
              text: '신청자의 Match를 완료한 뒤, 같은 Post에 아직 완료되지 않은 대상 Match가 남아 있는지 확인했습니다.\n완료 대상 Match가 남아 있으면 Post 상태를 유지하고, 더 이상 남아 있지 않을 때만 Post를 최종 완료했습니다.\n이후 등록자 책임비 환급과 채팅방 비활성화 예약으로 후속 처리를 이어갔습니다.',
              flow: [
                { title: 'Match 완료', text: '해당 신청자의 Match 완료' },
                { title: '남은 Match 확인', text: '같은 Post의 미완료 Match 확인' },
                { title: 'Post 최종 완료', text: '남은 대상이 없을 때 완료', tone: 'primary' },
                { title: '등록자 책임비 환급', text: 'Post 완료 후 등록자 환급' },
                { title: '채팅방 비활성화 예약', text: 'Post 완료 후 비활성화 예약' },
              ],
              cards: {
                columns: 2,
                items: [
                  {
                    label: 'Post 유지',
                    text: '완료되지 않은 대상 Match가 남아 있으면 Post 상태를 유지합니다.',
                  },
                  {
                    label: 'Post 완료',
                    text: '남은 완료 대상 Match가 없을 때만 Post를 최종 완료하고, \n등록자 책임비 환급으로 이어집니다.',
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
      number: '05',
      id: 'reliability',
      title: '안정성 및 후속 처리',
      navTitle: '안정성 및 후속 처리',
      navSubtitle: '중복 처리와 노쇼 판정',
      lead: '완료 상태와 정산 이력을 단계별로 재확인하고, 위치 데이터 정리와 노쇼 판정까지 후속 흐름으로 연결했습니다.',
      content: [
        {
          type: 'tabs',
          tabs: [
            {
              id: 'duplicate-defense',
              label: '중복 완료 / 환급 방어',
              title: '같은 요청이 반복돼도 완료와 환급이 중복되지 않도록 각 단계의 상태를 다시 확인했습니다.',
              text: 'QR 완료 요청은 반복 입력이나 네트워크 재요청으로 다시 들어올 수 있습니다.\n한 번의 완료 처리가 Match 상태 변경과 책임비 환급까지 이어지기 때문에, 같은 요청이 반복돼도 다시 처리되지 않도록 단계별 상태와 정산 이력을 확인했습니다.',
              reliabilityRows: {
                columns: [
                  {
                    title: '신청자 Match 단위',
                    rows: [
                      { label: '01 만남 인증 상태', text: '활성 MeetVerification을 비관락으로 조회해\n기존 만남 인증 완료 상태를 확인' },
                      { label: '02 Match', text: 'Match를 비관락으로 조회해 기존 완료 상태를 확인' },
                      { label: '03 신청자 정산', text: '최신 정산 이력을 확인하고, 이미 환급됐다면 생략한 뒤\n필요한 경우 신청자 책임비를 환급' },
                      { label: '04 결과', text: '완료와 환급 처리 전 단계별 상태와 정산 이력 재확인' },
                    ],
                  },
                  {
                    title: 'Post 단위',
                    rows: [
                      { label: '01 Post 조회', text: 'Post를 비관락으로 조회' },
                      { label: '02 남은 Match 확인', text: '같은 Post에 남아 있는 완료 대상 Match를 확인' },
                      { label: '03 완료 상태 확인', text: 'Post가 이미 완료됐는지 확인' },
                      { label: '04 등록자 정산', text: '최신 정산 이력을 확인하고, 이미 환급됐다면 생략한 뒤\n필요한 경우 등록자 책임비를 환급' },
                    ],
                  },
                ],
              },
              callout: 'QR 스캔 단계에서 활성 MeetVerification의 기존 완료 상태를 먼저 확인하고, 이후 Match와 Post에서도 상태를 다시 검증했습니다.\n책임비 환급 전에는 최신 정산 이력을 확인해 같은 요청이 반복되더라도 완료와 환급이 중복되지 않도록 구성했습니다.',
              calloutTone: 'soft',
            },
            {
              id: 'location-cleanup',
              label: '위치 데이터 정리',
              title: '인증과 노쇼 판단에 사용한 위치 데이터는 더 이상 필요하지 않은 시점에 정리했습니다.',
              text: '위치 정보는 GPS 장소 인증과 QR 만료 이후의 노쇼 판단에 필요한 동안만 사용했습니다.\n각 Match의 판단이 끝난 뒤에는 해당 Match에 저장된 위치 데이터만 정리했습니다.',
              locationCleanup: {
                lifecycleTitle: '위치 데이터 처리 흐름',
                steps: [
                  {
                    label: '01',
                    title: '인증 완료 상태 반영',
                    text: 'QR 인증 성공 결과를 해당 신청자의 만남 인증 상태에 먼저 반영했습니다.',
                  },
                  {
                    label: '02',
                    title: '해당 Match 위치 정리',
                    text: '해당 Match에 저장된 위치 데이터만 정리했습니다.',
                    tone: 'primary',
                  },
                  {
                    label: '03',
                    title: '후속 완료 처리',
                    text: '위치 데이터를 정리한 뒤에도 Match 완료와\n신청자 책임비 환급은 이어서 처리했습니다.',
                  },
                ],
                reasonTitle: '위치 정보가 필요한 시점',
                reasons: [
                  {
                    title: 'GPS 노쇼 판정',
                    text: 'GPS 노쇼는 최신 위치를 다시 조회하지 않고,\n인증 가능 시간 안에 기록된 등록자와 신청자의 장소 인증 완료 여부로 판단했습니다.\n판정이 끝난 뒤에는 해당 Match의 위치 데이터를 정리했습니다.',
                  },
                  {
                    title: 'QR 노쇼 판정',
                    text: 'QR 만료 후 노쇼 판정 시점 기준 최근 15초 이내 갱신된 위치가 60m 안에 있는지 확인했습니다. 필요한 경우 이탈 정보까지 사용해 판단한 뒤 해당 Match의 위치 데이터를 정리했습니다.',
                  },
                ],
                callout:
                  'GPS 노쇼는 이미 기록된 장소 인증 결과를 사용하고, QR 노쇼는 판정 시점 기준 최근 위치를 사용했습니다.\n각 판단이 끝난 뒤에는 해당 Match의 위치 데이터를 정리해 더 이상 필요하지 않은 위치 정보가 남지 않도록 했습니다.',
              },
            },
            {
              id: 'gps-noshow',
              label: 'GPS 노쇼 판정',
              title: 'GPS 인증 가능 시간이 끝난 뒤 기록된 인증 결과로 노쇼 여부를 판단했습니다.',
              text: 'GPS 노쇼에서는 현재 위치나 거리를 다시 계산하지 않고, 인증 가능 시간 안에 서버가 기록한 장소 인증 완료 여부를 사용했습니다.',
              noShowDecision: {
                callout:
                  'GPS 노쇼는 인증 가능 시간이 끝난 시점의 장소 인증 결과로 판단했습니다.\n판정 직후에는 노쇼 예정 상태만 반영하고, 이의제기 가능 시간을 거쳐 24시간 이후 확정 단계에서 책임비를 정산하도록 분리했습니다.',
                columns: [
                  {
                    title: 'GPS 노쇼',
                    policy: '',
                    information: [],
                    outcomes: [],
                    sections: [
                      {
                        heading: '언제 판단하나요?',
                        text: '약속 시간 또는 연장된 만남 시간을 기준으로 GPS 인증 가능 시간이 끝났는데도 장소 인증을 완료하지 않은 만남을 대상으로 판단합니다.',
                      },
                      {
                        heading: '무엇을 확인하나요?',
                        text: '장소 인증은 서버 판정 기준 60m를 사용합니다. 노쇼 판정에서는 위치를 다시 계산하지 않고, 인증 가능 시간 안에 장소 인증을 완료했는지만 확인합니다.',
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
                        text: '노쇼 예정 상태를 반영한 뒤 알림과 채팅 제한 등 후속 처리를 적용하고, 이의제기 가능 시간을 거쳐 24시간 이후 확정 단계에서 책임비를 정산합니다.',
                      },
                    ],
                  },
                ],
              },
            },
            {
              id: 'qr-noshow',
              label: 'QR 노쇼 판정',
              title: 'QR이 만료되면 완료 상태와 최신 위치를 다시 확인해 노쇼 유형을 판단했습니다.',
              text: 'QR 인증을 완료하지 않은 Match는 QR 만료 이후 상태를 다시 확인하고, 판정 시점 기준 최근 15초 이내 갱신된 위치와 필요한 경우 이탈 정보를 함께 사용해 노쇼 유형을 판단했습니다.',
              noShowDecision: {
                callout:
                  'QR이 만료됐다는 이유만으로 바로 노쇼를 확정하지 않고, 만남 완료 여부와 Match 상태, 최신 위치를 다시 확인했습니다.\n판정 직후에는 노쇼 예정 상태만 반영하고, 책임비 정산은 24시간 이후 확정 단계에서 진행하도록 분리했습니다.',
                columns: [
                  {
                    title: 'QR 노쇼',
                    policy: '',
                    information: [],
                    outcomes: [],
                    sections: [
                      {
                        heading: '언제 판단하나요?',
                        text: 'GPS 장소 인증까지 완료했지만 QR 발급 후 10분 안에 QR 인증을 완료하지 않은 Match를 노쇼 후보로 확인합니다. 스케줄러는 1분 주기로 QR 만료 대상을 확인합니다.',
                      },
                      {
                        heading: '먼저 무엇을 확인하나요?',
                        text: 'QR이 만료됐더라도 이미 완료된 만남이나 종료된 Match는 노쇼 대상으로 다시 처리하지 않도록 제외합니다.',
                        items: [
                          'QR 노쇼 후보 상태와 만료 시각',
                          '만남 완료 여부와 Match 진행 상태',
                          '판정 시점 기준 최근 15초 이내 갱신된 위치',
                          '서버 판정 범위 60m 내 위치 여부',
                          '필요 시 약속 장소를 먼저 벗어난 사용자',
                        ],
                      },
                      {
                        heading: '어떻게 판단하나요?',
                        text: "판정 시점 기준 최근 15초 이내에 갱신된 위치가 서버 판정 범위 60m 안에 있으면 해당 사용자가 반경 안에 있는 것으로 판단합니다.\n위치가 없거나 15초보다 오래됐거나 실제 반경 밖이면 모두 '반경 내 확인되지 않음'으로 처리합니다.",
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
                        text: '노쇼 예정 상태를 반영한 뒤 채팅 제한과 노쇼 예정 알림을 적용하고, 해당 Match의 위치 데이터를 정리합니다.\n책임비 정산은 24시간 이후 확정 단계에서 진행합니다.',
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
