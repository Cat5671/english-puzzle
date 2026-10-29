const ASSET_FOLDER = 'assets';

export const ASSET_PATHS = {
  images: `${ASSET_FOLDER}/images`,
  files: `${ASSET_FOLDER}/files`,
  data: `${ASSET_FOLDER}/data`,
} as const;

export function getAssetPath(type: 'files' | 'data', fileName: string) {
  return `/${ASSET_PATHS[type]}/${fileName}`;
}

export type Levels = 1 | 2 | 3 | 4 | 5 | 6;

export function getDataPath(level: Levels) {
  return `${ASSET_PATHS.data}/wordCollectionLevel${level}.json`;
}

export function getBackgroundPath(gameLevel: Levels, fileName: string) {
  return `/${ASSET_PATHS.images}/level${gameLevel}/${fileName}`;
}
