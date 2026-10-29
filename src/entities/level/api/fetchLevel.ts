import { type Levels, getDataPath } from '@/shared/config';
import { type LevelCollection } from '@/entities/level';

export async function getLevelData(
  level: Levels
): Promise<LevelCollection | undefined> {
  const response = await fetch(getDataPath(level));
  if (response.ok) {
    const levelData: LevelCollection = await response.json();
    return levelData;
  } else {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
}
