import { DeckModel, Deck } from '../interfaces/deck.interface';
import { FlashCardModel, Image } from '../interfaces/flashcard.interface';

export class LocalFlashCardDataSourceImpl {
  uploadImages(images: File[]): Promise<Image[]> {
    console.log(images);
    throw new Error('Method not implemented.');
  }
  setDefaultDeck(deckId: string, decks: DeckModel[]): Promise<DeckModel[]> {
    console.log(deckId, decks);
    throw new Error('Method not implemented.');
  }
  sincronizeDeck(deck: DeckModel): void {
    console.log(deck);
    throw new Error('Method not implemented.');
  }
  async createFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    // Consider if we do really need to fetch stored decks or we can use local decks and then save changes
    const decks = await this.getDecks();
    const deck = decks.find((deck) => deck.id === flashCard.deckId);

    if (!deck) {
      throw new Error('Deck not found');
    }

    deck.addFlashCard(flashCard);
    localStorage.setItem('decks', JSON.stringify(decks));
    return decks;
  }

  async editFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    const decks = await this.getDecks();
    const deck = decks.find((deck) => deck.id === flashCard.deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
    deck.updateFlashCard(flashCard);

    localStorage.setItem('decks', JSON.stringify(decks));
    return decks;
  }

  async updateFlashCardRevision(
    updatedFlashCard: FlashCardModel
  ): Promise<void> {
    const rawDecks =
      LocalFlashCardDataSourceImpl._getLocalStorageData<DeckModel[]>('decks') ??
      [];
    const decks: DeckModel[] = rawDecks.map((deck: DeckModel) => {
      const deckInstance = new Deck(deck);
      // deckInstance.setPendingStudyCards();
      return deckInstance;
    });
    const deck = decks.find((deck) => deck.id === updatedFlashCard.deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
    deck.updateFlashCard(updatedFlashCard);
    localStorage.setItem('decks', JSON.stringify(decks));
  }

  getFlashCards(deckId: string): Promise<FlashCardModel[]> {
    console.log(deckId);
    const storedCards = localStorage.getItem('flashcards');
    return storedCards ? JSON.parse(storedCards) : [];
  }

  async deleteFlashCard(flashCard: FlashCardModel): Promise<DeckModel[]> {
    const { deck, decks } = await this._getFlashCardDeckAndDecks(flashCard);
    deck.deleteFlashCard(flashCard);
    localStorage.setItem('decks', JSON.stringify(decks));
    return decks;
  }

  async getDecks(): Promise<DeckModel[]> {
    const rawDecks =
      LocalFlashCardDataSourceImpl._getLocalStorageData<DeckModel[]>('decks') ??
      [];
    const storedDecks: DeckModel[] = rawDecks.map((deck: DeckModel) => {
      const deckInstance = new Deck(deck);
      // deckInstance.setPendingStudyCards();
      return deckInstance;
    });
    //Local implementation, in non local implementation it should get the default deck from backend
    if (!storedDecks.length) {
      const defaultDeck = Deck.createDefaultDeck();
      await this.createDeck(defaultDeck);
      return [defaultDeck];
    }
    return storedDecks;
  }

  async createDeck(deck: DeckModel): Promise<DeckModel[]> {
    const storedDecks: DeckModel[] =
      LocalFlashCardDataSourceImpl._getLocalStorageData('decks') ?? [];
    storedDecks.push(deck);
    localStorage.setItem('decks', JSON.stringify(storedDecks));
    return storedDecks;
  }

  async editDeck(editedDeck: DeckModel): Promise<DeckModel[]> {
    const storedDecks: DeckModel[] = await this.getDecks();
    const deck = storedDecks.find(
      (storedDeck) => storedDeck.id === editedDeck.id
    );
    if (!deck) {
      throw new Error('Deck not found');
    }
    deck.editDeck(editedDeck);
    localStorage.setItem('decks', JSON.stringify(storedDecks));
    return storedDecks;
  }

  async deleteDeck(deck: DeckModel): Promise<DeckModel[]> {
    const storedDecks: DeckModel[] =
      LocalFlashCardDataSourceImpl._getLocalStorageData('decks') ?? [];
    const filteredDecks = storedDecks.filter(
      (storedDeck) => storedDeck.id !== deck.id
    );
    localStorage.setItem('decks', JSON.stringify(filteredDecks));
    return filteredDecks;
  }

  static _getLocalStorageData<T>(key: string): T | null {
    const rawData = localStorage.getItem(key);
    return rawData ? (JSON.parse(rawData) as T) : null;
  }

  async _getFlashCardDeckAndDecks(
    flashCard: FlashCardModel
  ): Promise<{ deck: DeckModel; decks: DeckModel[] }> {
    const decks = await this.getDecks();
    const deck = decks.find((deck) => deck.id === flashCard.deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
    return {
      deck,
      decks,
    };
  }
}
