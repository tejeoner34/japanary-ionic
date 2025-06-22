import { DeckModel, Deck } from 'src/app/services/interfaces/deck.interface';
import { FlashCardModel } from 'src/app/services/interfaces/flashcard.interface';

export const createDeckInstance = (rawDecks: DeckModel[]) => {
  return rawDecks.map((deck: DeckModel) => {
    const deckInstance = new Deck(deck);
    deckInstance.addId(deck.id || '');
    return deckInstance;
  });
};

export const flashcardAdapter = (flashcard: FlashCardModel) => {
  return {
    id: flashcard.id || null,
    front: flashcard.front,
    back: flashcard.back,
    interval: flashcard.interval,
    repetitions: flashcard.repetitions,
    easeFactor: flashcard.easeFactor,
    nextReview:
      flashcard.nextReview instanceof Date
        ? flashcard.nextReview.toISOString()
        : flashcard.nextReview,
    deckId: flashcard.deckId,
    imagesUrl:
      flashcard.imagesUrl?.map((image) => ({
        id: image.id,
        url: image.url,
      })) || [],
  };
};
