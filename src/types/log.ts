type LogTag =
  | '자아스스터디'
  | 'CS 스터디'
  | '후니의 쉽게 쓴 CISCO 네트워킹'
  | '코어자바스크립트'
  | 'HTTP 완벽 가이드'
  | '운영체제 아주 쉬운 세 가지 이야기';

export interface LogListItem {
  title: string;
  date: string; // YYYY-MM-DD 형식
  href?: string;
  tags?: LogTag[];
}
