import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { GameComponent } from './game.component';
import { SecondsminutesPipe } from '../pipes/secondsminutes.pipe';
import { GameService } from '../services/game.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  let authService: AuthService;
  let gameService: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        SecondsminutesPipe
      ],
      declarations: [GameComponent],
      providers: [
        { provide: Router },
        provideAnimationsAsync()
      ]
    });

    authService = TestBed.inject(AuthService);
    gameService = TestBed.inject(GameService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('create component', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
  });

  it('services component exist', () => {
    expect(authService).toBeTruthy();
    expect(gameService).toBeTruthy();
  });

  it('get current name', () => {
    component.userName = 'Marc';
    expect(component.userName).toEqual('Marc');
    expect(component.userName).toBeTruthy();
  });

  it('get list cards', () => {
    component.getListCards();
    component.cards = gameService.getCardsArray();
    expect(component.cards).toEqual(gameService.getCardsArray());
  });

});
