import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { SearchResult } from './interfaces/dictionary.interface';

const API_BASE_URL = 'http://localhost:3005/dictionary';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private http = inject(HttpClient);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSubject.asObservable();
  private resultsSubject = new BehaviorSubject<SearchResult[]>([]);
  readonly results$ = this.resultsSubject.asObservable();
  private errorSubject = new BehaviorSubject<any>(null);
  readonly error$ = this.errorSubject.asObservable();

  constructor() {}

  searchWord(query: string) {
    this.loadingSubject.next(true);
    this.http
      .get<SearchResult[]>(`${API_BASE_URL}?keyword=${query}`)
      .pipe(
        finalize(() => this.loadingSubject.next(false)),
        catchError((err) => {
          this.errorSubject.next(err);
          return of([]);
        })
      )
      .subscribe((result) => this.resultsSubject.next(result));
  }
  searchAi(query: string) {}

  searchSampleSentences(query: string) {}
}
