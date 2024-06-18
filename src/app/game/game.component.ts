import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
import { interval, map, Subscription } from 'rxjs';
import { card } from '../interfaces/card.interface';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  countdownSub$!: Subscription;

  party_over_count = 0;
  countdown = 3;
  timer = 120;
  coins = 0;

  cards!: card[];

  first_card!: any;
  second_card!: any;

  success_evnt!: boolean;
  error_evnt!: boolean;

  text_evnt_error!: string;
  text_evnt_success!: string;
  gameOverEvnt!: boolean;

  userName!: string | null;

  constructor(
    private router: Router,
    private gameService: GameService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCurrentUserName();
    this.countdownFunct();
    this.getListCards();
  }

  getCurrentUserName(): void {
    this.userName = this.authService.userData;
  }

  getListCards(): void {
    this.cards = this.gameService.getCardsArray();
  }

  countdownFunct(): void {
    let countdownObs$ = interval(1000)
      .pipe(
        map(() => {
          this.countdown = this.countdown - 1;
          this.timer = this.countdown < -1 ? this.timer - 1 : 120;
          if (this.timer === 0) {
            this.countdownSub$.unsubscribe();
            this.gameOver();
          }
        }));

    // SUBSCRIBTION AND LISTEN OBSEVABLE
    this.countdownSub$ = countdownObs$.subscribe();
  }

  verifiedCard(card: card): void {
    if (!this.gameOverEvnt && !card.found) {

      if (!this.first_card) {
        card.checking = true;
        this.first_card = card;

      } else if ((!this.second_card) && this.first_card?.id !== card.id) {
        card.checking = true;
        this.second_card = card;

        const cardVerifiedFunction =
          this.gameService.verifingIsSameCard(this.first_card, this.second_card);

        if (cardVerifiedFunction) {
          // ADD POINTS EVERY TIME YOU FIND TWO SAME CARDS
          this.party_over_count = this.party_over_count + 1;
          // ADD POINTS EVERY TIME YOU FIND TWO SAME CARDS
          this.coins = this.coins + 1;

          // IF FOUND SAME CARDS SET VAR found TRUE FOR BOOTH CARDS
          this.gameService.updateObjectCardsFound(this.cards, this.first_card).then((c2: card) => {
            setTimeout(() => {
              this.success_evnt = true;
              this.text_evnt_success =
                this.gameService.randomStringArray(this.gameService.array_evnt_success);
              c2.finishFound = false;
              setTimeout(() => { this.reset(); }, 500);
            }, 100);
          });

        } else {
          this.cards.map((c: card) => {
            if (c.checking && !c.found) {
              c.error = true;
            }
            // 
            setTimeout(() => {
              c.error = false;
              c.checking = false;
            }, 250);
          });

          // BOOLEAN STATE ERROR OR NOT
          this.error_evnt = true;
          // SEND ERROR RANDOM (DIFFERENT TEXT ERROR)
          this.text_evnt_error = this.gameService.randomStringArray(this.gameService.array_evnt_error);
          setTimeout(() => { this.reset(); }, 650);

        }
      }
      if (this.party_over_count === 8) { this.gameOver(); }
    } else {
      this.gameService.showMessageSnackBar('Cette paire de carte a déjà été trouvé, veuillez sélectionner une autre svp');
    }
  }

  gameOver(): void {
    this.gameOverEvnt = true;
    this.reset();
    // STOP COUNT DOWN
    this.countdownSub$.unsubscribe();
  }

  restart(): void {
    this.countdown = 3; this.timer = 120; this.coins = 0;
    this.cards = []; this.gameOverEvnt = false;
    this.party_over_count = 0;
    this.gameService.resetCardsArray().then(() => {
      this.reset();
      this.gameService.getCardsArray();
      this.getListCards();
      this.countdownFunct();
    });
  }

  reset(): void {
    this.first_card = null;
    this.second_card = null;
    this.success_evnt = false;
    this.error_evnt = false;
  }

  quitGame(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['/']).then(() => {
        this.gameService.showMessageSnackBar('Fin de la partie');
      });
    });
  }

  ngOnDestroy(): void {
    this.gameOver();
  }

}
