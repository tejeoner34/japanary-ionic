import { Injectable } from '@angular/core';
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
  onAuthStateChanged,
  UserCredential,
  User,
} from 'src/config/firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor() {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      this.currentUserSubject.next(user);
    });
  }

  createUser(
    email: string,
    password: string
  ): Observable<UserCredential | null> {
    return from(createUserWithEmailAndPassword(auth, email, password)).pipe(
      tap(() => console.log('User created')),
      catchError((error) => {
        console.error('Registration error:', error);
        this.errorSubject.next(error.message || 'Registration failed');
        return of(null);
      }),
      finalize(() => this.loadingSubject.next(false))
    );
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
