export interface PaintingInfo {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

export interface SentenceData {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

export interface RoundData {
  levelData: PaintingInfo;
  words: SentenceData[];
}

export interface LevelCollection {
  rounds: RoundData[];
}
