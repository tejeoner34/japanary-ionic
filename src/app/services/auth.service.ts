import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  from,
  map,
  Observable,
  of,
  take,
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
  private currentUserSubject = new BehaviorSubject<User | null | undefined>(
    undefined
  );
  public currentUser$ = this.currentUserSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isFirebaseUserLoading$: Observable<boolean> = this.currentUser$.pipe(
    map((user) => user === undefined)
  );
  private errorSubject = new BehaviorSubject<string | null>(null);

  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.currentUserSubject.next(user ?? null);
    });
  }

  /** Emits true once the initial Firebase check has completed */
  get isAuthResolved$(): Observable<User | null> {
    return this.currentUser$.pipe(
      filter((user) => user !== undefined), // wait until Firebase returns something
      take(1) // complete after first emission
      // Map to true just to signal "resolved"
      // but we could also just use `!!user`
    );
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
