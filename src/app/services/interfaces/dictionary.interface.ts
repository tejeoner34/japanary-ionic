export interface SearchResult {
  slug: string;
  isCommon: boolean;
  jlptLevels: string[];
  japaneseReadings: JapaneseReading[];
  senses: Sense[];
}

export interface JapaneseReading {
  word?: string;
  reading: string;
}

export interface Sense {
  englishDefinitions: string[];
  wordTypes: string[];
  tags: string[];
  seeAlso: string[];
  sentences?: string[];
}

export interface JapaneseSentence {
  furigana: string;
  word: string;
}

export interface ExampleSentence {
  english: string;
  japanese: JapaneseSentence[];
}

export type AiResponse = string;
