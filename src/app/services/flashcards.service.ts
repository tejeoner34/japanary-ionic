import { Injectable } from '@angular/core';
import {
  addDoc,
  auth,
  collection,
  db,
  doc,
  getDocs,
  onAuthStateChanged,
  query,
  where,
} from 'src/config/firebase';
import {
  BehaviorSubject,
  defer,
  forkJoin,
  from,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Deck, DeckModel } from './interfaces/deck.interface';
import { FlashCardModel } from './interfaces/flashcard.interface';
import { LocalFlashCardDataSourceImpl } from './implementations/localFlashcardDatasource.impl';
import { createDeckInstance } from 'src/utils/firebase';

const COLLECTIONS = {
  USERS: 'users',
  DECKS: 'decks',
  FLASHCARDS: 'flashcards',
};

const localImplementation = new LocalFlashCardDataSourceImpl();

@Injectable({ providedIn: 'root' })
export class FlashcardsService {
  private decksSubject = new BehaviorSubject<DeckModel[]>([]);
  public decks$ = this.decksSubject.asObservable();

  constructor() {}

  createDeck(deck: DeckModel) {
    return defer(() => {
      const deckCollection = this._getDecksCollection();
      return from(
        addDoc(deckCollection, {
          name: deck.name,
          description: deck.description,
          isDefault: deck.isDefault,
        })
      ).pipe(
        switchMap((newDeckRef) => {
          deck.addId(newDeckRef.id);
          return from(localImplementation.createDeck(deck));
        }),
        map((updatedLocalDecks) => createDeckInstance(updatedLocalDecks)),
        tap((updatedDecks) => this.decksSubject.next(updatedDecks)),
        catchError((err) => {
          console.error('Error creating deck:', err);
          return throwError(() => new Error(err));
        })
      );
    });
  }

  getDecks() {
    return this._getDecksRawDecks().pipe(
      map((decks) => {
        console.log('Decks retrieved:', decks);
        const processed = createDeckInstance(decks);
        localStorage.setItem(COLLECTIONS.DECKS, JSON.stringify(processed));
        localStorage.removeItem('cardsToUpdate');
        return processed;
      }),
      switchMap((decks) => {
        if (!decks.length) {
          const defaultDeck = Deck.createDefaultDeck();
          return this.createDeck(defaultDeck);
        }
        return of(decks);
      }),
      tap((decks) => this.decksSubject.next(decks)),
      catchError((err) => throwError(() => new Error(err)))
    );
  }

  private _getDecksRawDecks(): Observable<DeckModel[]> {
    return new Observable<string>((subscriber) => {
      onAuthStateChanged(auth, (user) => {
        console.log('Auth state changed:', user, auth);
        if (user) {
          subscriber.next(user.uid);
          subscriber.complete();
        } else {
          subscriber.error(() => new Error('User not logged in'));
        }
      });
    }).pipe(
      switchMap((uid) => {
        console.log;
        const userRef = doc(db, 'users', uid);
        const decksRef = collection(userRef, COLLECTIONS.DECKS);
        return from(getDocs(decksRef)).pipe(
          switchMap((decksSnapshot) => {
            if (decksSnapshot.metadata.fromCache) {
              return throwError(() => new Error('Error retrieving decks'));
            }

            const decks = decksSnapshot.docs.map((deckDoc) => ({
              id: deckDoc.id,
              data: deckDoc.data() as DeckModel,
              ref: deckDoc.ref,
            }));

            const today = new Date().toISOString();

            const flashcardObservables = decks.map(({ ref, id }) => {
              const flashcardRef = collection(ref, COLLECTIONS.FLASHCARDS);
              const pendingQuery = query(
                flashcardRef,
                where('nextReview', '<=', today)
              );
              return from(getDocs(pendingQuery)).pipe(
                map((snapshot) => ({
                  deckId: id,
                  pendingCards: snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                  })) as FlashCardModel[],
                }))
              );
            });

            return forkJoin(flashcardObservables).pipe(
              map((pendingResults) => {
                return decks.map(({ id, data }) => {
                  const pending = pendingResults.find(
                    (res) => res.deckId === id
                  );
                  return {
                    ...data,
                    id,
                    cards: {
                      pedingStudyCards: pending?.pendingCards || [],
                      pendingStudyAmount: pending?.pendingCards.length || 0,
                    },
                  };
                });
              })
            );
          })
        );
      }),
      catchError((err) => {
        console.error('Deck/Flashcard error:', err);
        return throwError(() => new Error('Error retrieving decks'));
      })
    );
  }

  private _getDecksCollection() {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) {
      throw new Error('User not logged in');
    }
    const userRef = doc(db, 'users', currentUserId);
    return collection(userRef, COLLECTIONS.DECKS);
  }
}
