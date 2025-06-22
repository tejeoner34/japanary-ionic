import { createUniqueId } from 'src/utils/helpers';
import { SpaceRepetition } from '../space-repetition/spaceRepetition';

export interface FlashCardModel {
  id: string;
  front: string;
  back: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  nextReview: Date;
  deckId: string;
  imagesUrl: Image[];
  updateWithGrade: (grade: Grade) => void;
}

export interface FlashCardsData {
  totalAmount?: number;
  pendingStudyAmount: number;
  allCards?: FlashCardModel[];
  pedingStudyCards: FlashCardModel[];
}

export enum Grade {
  Again = 0,
  Hard = 1,
  Medium = 2,
  Easy = 3,
}

interface NewFlashCardProps {
  front: string;
  back: string;
  deckId: string;
  id?: string;
  nextReview?: Date;
  imagesUrl?: Image[];
}

export interface Image {
  id: string;
  url: string;
}

export class FlashCard implements FlashCardModel {
  id: string;
  front: string;
  back: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  nextReview: Date;
  deckId: string;
  imagesUrl: Image[];

  constructor({
    back,
    deckId,
    front,
    id,
    nextReview,
    imagesUrl,
  }: NewFlashCardProps) {
    this.id = id || createUniqueId();
    this.back = back;
    this.deckId = deckId;
    this.easeFactor = 2.5;
    this.front = front;
    this.interval = 0;
    this.nextReview = nextReview || new Date();
    this.repetitions = 0;
    this.imagesUrl = imagesUrl || [];
  }

  updateWithGrade(grade: Grade): void {
    const updatedCard = SpaceRepetition.updateSpaceRepetitionData(this, grade);
    this.interval = updatedCard.interval;
    this.repetitions = updatedCard.repetitions;
    this.easeFactor = updatedCard.easeFactor;
    this.nextReview = updatedCard.nextReview;
  }

  static updateWithGrade(card: FlashCardModel, grade: Grade): FlashCardModel {
    return SpaceRepetition.updateSpaceRepetitionData(card, grade);
  }
}
