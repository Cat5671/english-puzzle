import { type Levels } from '@/shared/config';
import {
  type LevelCollection,
  type RoundData,
  getLevelData,
} from '@/entities/level';

let currentLevel: Levels = 1;
let levelData: LevelCollection | undefined;

export async function getGameRound(
  level: Levels,
  round: number
): Promise<RoundData | undefined> {
  if (level === currentLevel && levelData) {
    return levelData.rounds[round];
  }
  try {
    levelData = await getLevelData(level);
    const rounds = levelData?.rounds;
    if (levelData && rounds && rounds.length > round) {
      currentLevel = level;
      return rounds[round];
    }
  } catch (er) {
    console.log(er);
  }
}
