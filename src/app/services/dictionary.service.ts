import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { SearchResult } from './interfaces/dictionary.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

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
      .get<SearchResult[]>(`${this.baseUrl}?keyword=${query}`)
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
