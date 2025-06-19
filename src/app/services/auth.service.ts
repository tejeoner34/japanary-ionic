import { Injectable } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import {
  BehaviorSubject,
  catchError,
  finalize,
  from,
  Observable,
  of,
  tap,
} from 'rxjs';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'src/config/firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();
  constructor() {}

  async createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  signIn(email: string, password: string): Observable<UserCredential | null> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return from(signInWithEmailAndPassword(auth, email, password)).pipe(
      tap(() => console.log('User signed in')),
      catchError((error) => {
        console.error('Login error:', error);
        this.errorSubject.next(error.message || 'Login failed');
        return of(null);
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  async signOut() {
    return auth.signOut();
  }
}
