type LogTag =
  | '자아스스터디'
  | 'CS 스터디'
  | '후니의 쉽게 쓴 CISCO 네트워킹'
  | '코어자바스크립트';

export interface LogListItem {
  title: string;
  date: string; // YYYY-MM-DD 형식
  href?: string;
  tags?: LogTag[];
}
