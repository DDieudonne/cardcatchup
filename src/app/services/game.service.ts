import { Injectable } from '@angular/core';
import { card } from '../interfaces/card.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  cards: card[] = [
    { id: 'mhj1i', name: 'dog', found: false, checking: false, error: false, finishFound: false },
    { id: 'yejtl', name: 'cat', found: false, checking: false, error: false, finishFound: false },
    { id: 'xhk11', name: 'hamster', found: false, checking: false, error: false, finishFound: false },
    { id: 'zursc', name: 'lion', found: false, checking: false, error: false, finishFound: false },
    { id: 'p4kn4', name: 'mouse', found: false, checking: false, error: false, finishFound: false },
    { id: '2dsij', name: 'panda', found: false, checking: false, error: false, finishFound: false },
    { id: '6ot5g', name: 'pig', found: false, checking: false, error: false, finishFound: false },
    { id: 'lmp66', name: 'rabbit', found: false, checking: false, error: false, finishFound: false },
    { id: 'xvcno', name: 'rabbit', found: false, checking: false, error: false, finishFound: false },
    { id: 'a9wvx', name: 'pig', found: false, checking: false, error: false, finishFound: false },
    { id: 'bh2db', name: 'panda', found: false, checking: false, error: false, finishFound: false },
    { id: '2o51c', name: 'mouse', found: false, checking: false, error: false, finishFound: false },
    { id: '58ykp', name: 'lion', found: false, checking: false, error: false, finishFound: false },
    { id: 'eskwp', name: 'hamster', found: false, checking: false, error: false, finishFound: false },
    { id: 'lwaij', name: 'cat', found: false, checking: false, error: false, finishFound: false },
    { id: 'gsy74', name: 'dog', found: false, checking: false, error: false, finishFound: false },
  ];

  array_evnt_error = [
    'Éssaye encore!',
    'N\'abondonne pas!',
    'Tu peux y arriver!'
  ];
  array_evnt_success = [
    'assets/reactions/smiley1.png',
    'assets/reactions/smiley2.png',
    'assets/reactions/smiley3.png',
  ];


  currentUserName: any = null;

  constructor(private _snackBar: MatSnackBar) { }

  resetCardsArray(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.cards.map(card => {
        card.checking = false; card.error = false;
        card.finishFound = false; card.found = false;
        return card;
      });
      resolve(true);
    });
  }

  updateObjectCardsFound(cards: card[], first_card: card): Promise<card> {
    return new Promise((resolve, reject) => {
      cards.filter((c: card) => (c.name === first_card.name && !c.found))
        .map((c2: card, i: number) => {
          c2.found = true;
          c2.finishFound = true;
          if (i === 1)
            resolve(c2)
        });
    });
  }

  updateObjectCardsFoundError(cards: card[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      cards.map((c: card, i: number) => {
        // <-- FINDING BOTH CARDS CLICKED AND HAS NOT ALREADY FOUND;
        // set ERROR for mistake cards -->
        if (c.checking && !c.found) { c.error = true; }
        setTimeout(() => { c.error = false, 500; });
        setTimeout(() => { c.checking = false, 500; resolve(true); });

        // setTimeout(() => { c.checking = false; }, 100);
        // setTimeout(() => { }, 350);
      });
    });
  }

  // GET LIST CARDS
  getCardsArray() {
    const shuffledArray = this.randomCardsFunction(this.cards);
    return shuffledArray;
  }

  randomCardsFunction = (array: card[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  randomStringArray(array: string[]) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
  }

  verifingIsSameCard(card1: card, card2: card) {
    return card1.name === card2.name ? true : false;
  }

  showMessageSnackBar(message: string) {
    this._snackBar.open(message, '', { duration: 3500, horizontalPosition: 'center', verticalPosition: 'top' });
  }

}
