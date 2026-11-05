import { type Levels } from '@/shared/config';
import type { GameData, SentenceIdx } from '@/entities/game';

const SENTENCES_PER_ROUND = 10;
const LEVELS = 6;

export function getNextGameData(gameData: GameData, totalRounds: number) {
  let { level, round, sentenceIdx } = gameData;

  sentenceIdx += 1;
  if (sentenceIdx >= SENTENCES_PER_ROUND) {
    sentenceIdx = 0;
    round += 1;
  }

  if (round >= totalRounds) {
    round = 0;
    level += 1;
  }
  if (level >= LEVELS) {
    return 'Game over';
  }
  level = level as Levels;
  sentenceIdx = sentenceIdx as SentenceIdx;
  return { level, round, sentenceIdx };
}
