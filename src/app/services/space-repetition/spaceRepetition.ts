import { FlashCardModel, Grade } from '../interfaces/flashcard.interface';

export class SpaceRepetition {
  static updateSpaceRepetitionData(
    flashCard: FlashCardModel,
    grade: Grade
  ): FlashCardModel {
    let { interval, repetitions, easeFactor, nextReview } = flashCard;

    switch (grade) {
      case Grade.Again:
        repetitions = 0;
        interval = 0;
        easeFactor = Math.max(1.3, easeFactor - 0.2);
        break;
      case Grade.Hard:
        repetitions += 1;
        interval = 1;
        easeFactor = Math.max(1.3, easeFactor - 0.15);
        break;
      case Grade.Medium:
        repetitions += 1;
        interval = interval > 0 ? Math.round(interval * easeFactor) : 2;
        break;
      case Grade.Easy:
        repetitions += 1;
        interval = interval > 0 ? Math.round(interval * easeFactor * 1.5) : 4;
        easeFactor += 0.15;
        break;
    }
    nextReview = new Date();
    if (interval > 0) {
      nextReview.setDate(nextReview.getDate() + interval);
    }

    return { ...flashCard, interval, repetitions, easeFactor, nextReview };
  }
}
