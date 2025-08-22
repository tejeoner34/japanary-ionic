import {
  ExampleSentence,
  SearchResult,
} from 'src/app/services/interfaces/dictionary.interface';

export const createFormBackTemplate = (
  wordData: SearchResult,
  sampleSentences: ExampleSentence[] = []
): string => {
  const meaningsArray = wordData.senses.map((sense) =>
    sense.englishDefinitions.join(', ')
  );
  const meaningsArrayToString = meaningsArray.join(', ');
  let template = `Reading: \n\n${wordData.japaneseReadings[0].reading}\n\nMeaning: \n\n${meaningsArrayToString}`;
  if (sampleSentences.length) {
    const { english, japanese } = formatSampleSentenceToString(
      sampleSentences[0]
    );
    template = template.concat(`\n\nSentences: \n\n${japanese}\n\n${english}`);
  }

  return template;
};

export const formatSampleSentenceToString = (
  sampleSentence: ExampleSentence
): { japanese: string; english: string } => {
  let japaseseSentence = '';
  sampleSentence.japanese.forEach((item) => {
    japaseseSentence += `${item.word}`;
  });

  return {
    japanese: japaseseSentence,
    english: sampleSentence.english,
  };
};
