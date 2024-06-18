import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tutorial-modal',
  templateUrl: './tutorial-modal.component.html',
  styleUrl: './tutorial-modal.component.scss'
})
export class TutorialModalComponent {
  constructor(public dialogRef: MatDialogRef<TutorialModalComponent>) { }
  close() { this.dialogRef.close(true); }
}
