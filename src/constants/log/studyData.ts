export interface StudyItem {
  title: string;
  date: string;
  timeStamps: number; // Unix timestamp in seconds
  href?: string;
}

const CORE_JS_STUDY = [
  {
    title: '박건규 2주차 공부 ',
    date: '2025-07-08',
    timeStamps: 1751932800,
    href: 'https://geongyu09.notion.site/2-22aedd40d49480f4b759dd0714d5fbeb',
  },
  {
    title: '3주차 내용',
    date: '2025-07-15',
    timeStamps: 1752537600,
    href: 'https://geongyu09.notion.site/3-231edd40d494807c9f5cc6dc2a5fab4f',
  },
  {
    title: '자료구조와 자료형',
    date: '2025-07-29',
    timeStamps: 1753747200,
    href: 'https://geongyu09.notion.site/23fedd40d494800ebcb6df346e541c77',
  },
  {
    title: '5주차 공부 내용',
    date: '2025-08-05',
    timeStamps: 1754352000,
    href: 'https://geongyu09.notion.site/5-246edd40d49480d1bcc1f668b1993869',
  },
  {
    title: '6회차 공부내용_박건규',
    date: '2025-08-12',
    timeStamps: 1754956800,
    href: 'https://geongyu09.notion.site/6-_-24dedd40d49480a5a931db40fa66dcf3',
  },
  {
    title: '중간 복습',
    date: '2025-08-19',
    timeStamps: 1755561600,
    href: 'https://geongyu09.notion.site/254edd40d494807cb0aad0eb47f8f385',
  },
  {
    title: '8회차(객체 프로퍼티/프로토타입 상속)',
    date: '2025-08-26',
    timeStamps: 1756166400,
    href: 'https://geongyu09.notion.site/8-25bedd40d49480bdb49cd2315ac4d0cb',
  },
  {
    title: '클래스',
    date: '2025-09-05',
    timeStamps: 1757030400,
    href: 'https://geongyu09.notion.site/265edd40d4948077aa15d3d40da5a05b',
  },
  {
    title: '에러 핸들링',
    date: '2025-09-08',
    timeStamps: 1757289600,
    href: 'https://geongyu09.notion.site/268edd40d4948075bcf0d13bdb8a753f',
  },
  {
    title: '프라미스 상편',
    date: '2025-09-15',
    timeStamps: 1757894400,
    href: 'https://geongyu09.notion.site/26fedd40d494802e95fef10b333dfe4c',
  },
  {
    title: '비동기 / 제너레이터',
    date: '2025-09-22',
    timeStamps: 1758499200,
    href: 'https://geongyu09.notion.site/276edd40d49480078848e4971e7791f7',
  },
  {
    title: '모듈',
    date: '2025-09-30',
    timeStamps: 1759190400,
    href: 'https://geongyu09.notion.site/27eedd40d49480d084dfe2421e8c0b46',
  },
  {
    title: '1장 마지막! etc',
    date: '2025-10-13',
    timeStamps: 1760313600,
    href: 'https://geongyu09.notion.site/1-etc-28bedd40d49480698518f9e421bc05e4',
  },
  {
    title: '15주차 돔 탐색',
    date: '2025-11-03',
    timeStamps: 1762128000,
    href: 'https://geongyu09.notion.site/15-2a0edd40d49480c69981dc2d2853123d',
  },
];

const CISCO: StudyItem[] = [
  {
    title: '1~2장 공부내용',
    date: '2024-11-26',
    timeStamps: 1732579200,
    href: 'https://geongyu09.notion.site/1-2-14aedd40d4948035a19bdc018b8270e7',
  },
  {
    title: '3, 4장 공부 내용 정리',
    date: '2024-12-22',
    timeStamps: 1734825600,
    href: 'https://geongyu09.notion.site/3-4-164edd40d494808cbe61dc40d40c6423',
  },
  {
    title: '4, 5장 공부 내용 정리',
    date: '2025-01-06',
    timeStamps: 1736121600,
    href: 'https://geongyu09.notion.site/4-5-171edd40d49480708cd1efd8fbc3f1fd',
  },
  {
    title: '6장 1~1정리',
    date: '2025-01-12',
    timeStamps: 1736640000,
    href: 'https://geongyu09.notion.site/6-1-1-178edd40d49480479db4dd6eaa2e73f7',
  },
  {
    title: '6장 VLAN',
    date: '2025-02-01',
    timeStamps: 1738368000,
    href: 'https://geongyu09.notion.site/6-VLAN-18dedd40d494804aa5d8e3508fbdf269',
  },
  {
    title: '7장 라우터',
    date: '2025-02-09',
    timeStamps: 1739059200,
    href: 'https://geongyu09.notion.site/7-195edd40d4948054bfb8cc50e88c4133',
  },
  {
    title: '8장 라우팅 프로토콜',
    date: '2025-02-16',
    timeStamps: 1739664000,
    href: 'https://geongyu09.notion.site/8-19cedd40d494801da103d9c0ff70de98',
  },
  {
    title: '9장',
    date: '2025-03-02',
    timeStamps: 1740960000,
    href: 'https://geongyu09.notion.site/9-1aaedd40d49480099e0ee92cb2509d92',
  },
  {
    title: '10 ~ 11장',
    date: '2025-03-10',
    timeStamps: 1741651200,
    href: 'https://geongyu09.notion.site/10-11-1b2edd40d494803cb8bee031b3617c7f',
  },
];

const JAAS_STUDY: StudyItem[] = [
  {
    title: '2주차',
    date: '2024-07-01',
    timeStamps: 1719848760,
    href: 'https://geongyu09.notion.site/2-da21815c1aba4157b0c826ed1eb54cbc',
  },
  {
    title: '3주차',
    date: '2024-07-09',
    timeStamps: 1720489260,
    href: 'https://geongyu09.notion.site/3-b0361fe28142428e8132769c4e12e7ee',
  },
  {
    title: '4주차',
    date: '2024-07-15',
    timeStamps: 1721052840,
    href: 'https://geongyu09.notion.site/4-c7f0694584fd4e96942625c945830e28',
  },
  {
    title: '5주차',
    date: '2024-07-23',
    timeStamps: 1721748120,
    href: 'https://geongyu09.notion.site/5-26e8e40c6bbe435b8c9bc1760d8b9b18',
  },
  {
    title: '6주차',
    date: '2024-08-05',
    timeStamps: 1722847500,
    href: 'https://geongyu09.notion.site/6-c6415a3e0e2c47918f3ad74782b91a00',
  },
  {
    title: '7주차',
    date: '2024-08-13',
    timeStamps: 1723512960,
    href: 'https://geongyu09.notion.site/7-d3ac1d845a90452697035d07806cd14f',
  },
];

export const STUDY_DATA: StudyItem[] = [
  ...CISCO,
  ...CORE_JS_STUDY,
  ...JAAS_STUDY,
];
