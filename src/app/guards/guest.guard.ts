import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, switchMap, take } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthResolved$.pipe(
    switchMap(() => authService.currentUser$),
    map((user) => {
      if (user) {
        router.navigate(['/decks']);
        return false;
      } else {
        return true;
      }
    })
  );
};
