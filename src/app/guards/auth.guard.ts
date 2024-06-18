import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuth().pipe(
    map((isAuth) => {
      if (!isAuth) {
        return router.createUrlTree(['/']);
      }

      return true;
    })
  );
};

export const welcomeGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuth().pipe(
    map((isAuth) => {
      if (isAuth) {
        return router.createUrlTree(['/jeu']);
      }

      return true;
    })
  );
};
