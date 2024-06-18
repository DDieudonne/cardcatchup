import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard, welcomeGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '', component: AppComponent,
        children: [
            {
                path: 'bienvenue',
                loadChildren: () => import('./welcome/welcome.module').then((m) => m.WelcomeModule),
                canActivate: [welcomeGuard]
            },
            {
                path: 'jeu',
                loadChildren: () => import('./game/game.module').then((m) => m.GameModule),
                canActivate: [authGuard]
            },
            { path: '', redirectTo: 'bienvenue', pathMatch: 'full' },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ],
    },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
