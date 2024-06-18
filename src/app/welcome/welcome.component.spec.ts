import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { TutorialModalComponent } from '../shared/tutorial-modal/tutorial-modal.component';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let authService: AuthService;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
      ],
      declarations: [WelcomeComponent],
      providers: [
        { provide: Router },
        provideAnimationsAsync()
      ]
    });

    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('create component', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
  });

  it('service component exist', () => {
    expect(authService).toBeTruthy();
  });

  it('open dialog tuto', () => {
    const matDialogConfig = {
      width: '350px',
      disableClose: true,
      enterAnimationDuration: 0,
      exitAnimationDuration: 0,
    };

    const form = component.form;
    const modalTutorial = component.matDialog;

    form.controls['nameCtrl'].setValue('Marc');
    expect(form.valid).toBeTruthy();

    spyOn(component.matDialog, 'open').and.callThrough();
    component.openValidationModal();
    expect(modalTutorial.open).toHaveBeenCalledWith(TutorialModalComponent, matDialogConfig);
  });

  it('after close dialog tuto', () => {
    const matDialogConfig: MatDialogConfig = {
      width: '350px',
      disableClose: true,
      enterAnimationDuration: 0,
      exitAnimationDuration: 0,
    };

    component.tutotrial = component.matDialog.open(TutorialModalComponent, matDialogConfig);

    spyOn(component.tutotrial, 'afterClosed').and.returnValue(of(true));
    expect(component.tutotrial).toBeDefined();
  });

  it('set data user after close modal', () => {
    component.setUserNameAfterCloseModal();
    component.name = component.form.value.nameCtrl;
    expect(component.name).toEqual(component.form.value.nameCtrl);
    authService.doLogin(component.name);
  });

});
