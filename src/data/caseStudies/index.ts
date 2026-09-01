import type { CaseStudyContent } from './types';
import { hankkipotCaseStudy } from './hankkipot';
import { kServerCaseStudy } from './k-server';
import { readys7CaseStudy } from './readys7';

export type { CaseStudyContent } from './types';

export const caseStudies: Record<string, CaseStudyContent> = {
  hankkipot: hankkipotCaseStudy,
  'k-server': kServerCaseStudy,
  readys7: readys7CaseStudy,
};
