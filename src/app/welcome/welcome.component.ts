import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { TutorialModalComponent } from '../shared/tutorial-modal/tutorial-modal.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  name = '';
  form!: FormGroup;
  tutotrial!: MatDialogRef<TutorialModalComponent, any>;

  constructor(
    public router: Router,
    public matDialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit() { this.initForm(); }

  initForm() {
    this.form = new FormGroup({
      nameCtrl: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)]
        ))
    });
  }

  openValidationModal() {
    if (this.form.valid) {
      const matDialogConfig: MatDialogConfig = {
        width: '350px',
        disableClose: true,
        enterAnimationDuration: 0,
        exitAnimationDuration: 0,
      };
      this.tutotrial = this.matDialog.open(TutorialModalComponent, matDialogConfig);
      this.tutotrial.afterClosed().pipe(map((result) => {
        console.log('result', result)
        result ? this.setUserNameAfterCloseModal() : null;
      })).subscribe();
    }
  }

  setUserNameAfterCloseModal(): void {
    this.name = this.form.value.nameCtrl;
    this.authService.doLogin(this.name);
    this.navToHome();
  }

  navToHome() {
    this.router.navigate(['jeu']);
  }

}
