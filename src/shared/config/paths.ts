const ASSET_FOLDER = 'assets';

export const ASSET_PATHS = {
  images: `${ASSET_FOLDER}/images`,
  files: `${ASSET_FOLDER}/files`,
  data: `${ASSET_FOLDER}/data`,
};

export function getAssetPath(type: 'files' | 'data', fileName: string) {
  return `/${ASSET_PATHS[type]}/${fileName}`;
}

export function getBackgroundPath(gameLevel: number, fileName: string) {
  return `/${ASSET_PATHS['images']}/level${gameLevel}/${fileName}`;
}
