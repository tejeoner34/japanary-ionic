import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Image {
  id: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SaveImageService {
  private http = inject(HttpClient);
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _error$ = new BehaviorSubject<string | null>(null);
  private _images = signal<File[]>([]);
  images = this._images.asReadonly();
  loading$ = this._loading$.asObservable();
  error$ = this._error$.asObservable();

  constructor() {}

  uploadImages(images: File[]): Observable<Image[]> {
    if (images.length === 0) {
      return new Observable((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    this._loading$.next(true);
    this._error$.next(null);

    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return this.http
      .post<Image[]>(`${environment.apiBaseUrlFlashcards}/upload`, formData, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error uploading images:', error);
          this._error$.next('Failed to upload images. Please try again.');
          return throwError(() => new Error('Upload failed'));
        }),
        finalize(() => {
          this._loading$.next(false);
        })
      );
  }

  addImage(image: File) {
    this._images.update((images) => [...images, image]);
  }

  clearImages() {
    this._images.set([]);
  }
}
