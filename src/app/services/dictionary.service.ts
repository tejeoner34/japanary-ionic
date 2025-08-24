import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import {
  AiResponse,
  ExampleSentence,
  SearchResult,
} from './interfaces/dictionary.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSubject.asObservable();
  private loadingSentecesSubject = new BehaviorSubject<boolean>(false);
  readonly loadingSenteces$ = this.loadingSentecesSubject.asObservable();
  private loadingAiResponseSubject = new BehaviorSubject<boolean>(false);
  readonly loadingAiResponse$ = this.loadingAiResponseSubject.asObservable();

  private sentecesResultSubject = new BehaviorSubject<ExampleSentence[]>([]);
  readonly sentecesResult$ = this.sentecesResultSubject.asObservable();
  private resultsSubject = new BehaviorSubject<SearchResult[]>([]);
  readonly results$ = this.resultsSubject.asObservable();
  private aiResponseSubject = new BehaviorSubject<AiResponse>('');
  readonly aiResponse$ = this.aiResponseSubject.asObservable();

  private errorSentencesSubject = new BehaviorSubject<any>(null);
  readonly errorSentences$ = this.errorSentencesSubject.asObservable();
  private errorSubject = new BehaviorSubject<any>(null);
  readonly error$ = this.errorSubject.asObservable();
  private aiErrorSubject = new BehaviorSubject<any>(null);
  readonly aiError$ = this.errorSubject.asObservable();

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

  searchAi(query: string) {
    this.loadingAiResponseSubject.next(true);
    this.http
      .get<AiResponse>(`${environment.apiBaseUrl}/search-ai?keyword=${query}`)
      .pipe(
        finalize(() => this.loadingAiResponseSubject.next(false)),
        catchError((err) => {
          this.aiErrorSubject.next(err);
          return of('');
        })
      )
      .subscribe((result) => this.aiResponseSubject.next(result));
  }

  searchSampleSentences(query: string) {
    this.loadingSentecesSubject.next(true);
    this.http
      .get<ExampleSentence[]>(
        `${environment.apiBaseUrl}/sample-sentence?keyword=${query}`
      )
      .pipe(
        finalize(() => this.loadingSentecesSubject.next(false)),
        catchError((err) => {
          this.errorSentencesSubject.next(err);
          return of([]);
        })
      )
      .subscribe((result) => this.sentecesResultSubject.next(result));
  }
}
