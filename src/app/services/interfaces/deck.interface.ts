import { FlashCardModel, FlashCardsData } from './flashcard.interface';

interface NewDeckConfig {
  name: string;
  description?: string;
  cards?: FlashCardsData;
  id?: string | null;
  isDefault?: boolean;
}

export interface DeckModel {
  id?: string | null;
  name: string;
  description?: string;
  cards: FlashCardsData;
  isDefault?: boolean;
  addId: (id: string) => void;
  addFlashCard(flashCard: FlashCardModel): void;
  updateFlashCard(flashCard: FlashCardModel): void;
  editDeck(editedDeck: DeckModel): void;
  setPendingStudyCards(pendingCards: FlashCardModel[]): void;
  deleteFlashCard(flashCard: FlashCardModel): void;
}

export class Deck implements DeckModel {
  id: string | null;
  name: string;
  description: string;
  cards: FlashCardsData;
  isDefault?: boolean;

  constructor({
    name,
    description,
    cards,
    id,
    isDefault = false,
  }: NewDeckConfig) {
    this.id = id || null;
    this.name = name;
    this.cards = cards || {
      allCards: [],
      pedingStudyCards: [],
      pendingStudyAmount: 0,
      totalAmount: 0,
    };
    this.description = description || '';
    this.isDefault = isDefault;
  }

  static createDefaultDeck(): DeckModel {
    return new Deck({
      name: 'Default',
      description: 'This is a default deck, you can modify or create new ones',
    });
  }

  addId(id: string) {
    this.id = id;
  }

  addFlashCard(flashCard: FlashCardModel): void {
    console.log(flashCard);
    // this.cards.allCards.push(flashCard);
    // this.cards.pedingStudyCards.push(flashCard);
    // this.cards.pendingStudyAmount++;
    // this.cards.totalAmount++;
  }

  updateFlashCard(flashCard: FlashCardModel): void {
    const pendingCardsIndex = this.cards.pedingStudyCards.findIndex(
      (card) => card.id === flashCard.id
    );
    if (pendingCardsIndex !== -1)
      this.cards.pedingStudyCards[pendingCardsIndex] = flashCard;
  }

  deleteFlashCard(flashCard: FlashCardModel) {
    const { id } = flashCard;
    this.cards.pedingStudyCards = this.cards.pedingStudyCards.filter(
      (card) => card.id !== id
    );
  }

  editDeck(deck: DeckModel): void {
    this.name = deck.name;
    this.description = deck.description || '';
  }

  setPendingStudyCards(pendingCards: FlashCardModel[]) {
    this.cards.pedingStudyCards = pendingCards;
  }
}
