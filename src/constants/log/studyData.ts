import { LogListItem } from '@/types/log';
import JAASSTUDY from './JAASSTUDY';
import DONUT_STUDY from './DONUT_STUDY';
import CS_STUDY from './CS_STUEY';

const STUDY_DATA: LogListItem[] = [...JAASSTUDY, ...DONUT_STUDY, ...CS_STUDY];

export default STUDY_DATA;
