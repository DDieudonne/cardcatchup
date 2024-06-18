// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, of, switchMap, tap } from 'rxjs';
// import { AuthService } from '../../services/auth/auth.service';
// import { checkAuth, checkAuthComplete, login, loginComplete, logout, logoutComplete } from './auth.actions';

// @Injectable()
// export class AuthEffects {
//     constructor(
//         private actions$: Actions,
//         private authService: AuthService,
//         private router: Router
//     ) { }

//     login$ = createEffect(
//         () =>
//             this.actions$.pipe(
//                 ofType(login),
//                 switchMap((data) => this.authService.doLogin(data))
//             ),
//         { dispatch: false }
//     );

//     checkauth$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(checkAuth),
//             switchMap(() =>
//                 this.authService
//                     .checkAuth()
//                     .pipe(
//                         map((isLoggedIn) =>
//                             checkAuthComplete({ isLoggedIn })
//                         )
//                     )
//             )
//         )
//     );

//     checkAuthComplete$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(checkAuthComplete),
//             switchMap(({ isLoggedIn }) => {
//                 if (isLoggedIn) {
//                     return this.authService.userData.pipe(
//                         map((profile) =>
//                             loginComplete({ profile, isLoggedIn })
//                         )
//                     );
//                 }
//                 return of(logoutComplete());
//             })
//         )
//     );

//     logout$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(logout),
//             tap(() => this.authService.signOut()),
//             map(() => logoutComplete())
//         )
//     );

//     logoutComplete$ = createEffect(
//         () =>
//             this.actions$.pipe(
//                 ofType(logoutComplete),
//                 tap(() => this.router.navigate(['/']))
//             ),
//         { dispatch: false }
//     );
// }
