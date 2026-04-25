import { LogListItem } from '@/types/log';
import JAASSTUDY from './study-list/JAASSTUDY';
import DONUT_STUDY from './study-list/DONUT_STUDY';
import CS_STUDY from './study-list/CS_STUEY';
import MODERN_JS_STUDY from './study-list/MODERN_JS_STUDY';
import TS_STUDY from './study-list/TS_STUDY';

const STUDY_DATA: LogListItem[] = [
  ...JAASSTUDY,
  ...DONUT_STUDY,
  ...CS_STUDY,
  ...MODERN_JS_STUDY,
  ...TS_STUDY,
];

export default STUDY_DATA;
