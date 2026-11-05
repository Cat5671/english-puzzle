import { type Levels } from '@/shared/config';

export type SentenceIdx = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type GameData = {
  level: Levels;
  round: number;
  sentenceIdx: SentenceIdx;
};
