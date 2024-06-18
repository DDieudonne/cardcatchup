import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../shared.module';
import { TutorialModalComponent } from './tutorial-modal.component';
import { MaterialModule } from '../material.module';
import { By } from '@angular/platform-browser';

describe('TutorialModalComponent', () => {
  let component: TutorialModalComponent;
  let dialogRef: MatDialogRef<TutorialModalComponent>;
  let fixture: ComponentFixture<TutorialModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [TutorialModalComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    });

    dialogRef = TestBed.inject(MatDialogRef<TutorialModalComponent>);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialModalComponent);
    component = fixture.debugElement.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef<TutorialModalComponent>);
    fixture.detectChanges();
  });

  it('create component', () => {
    expect(component).toBeTruthy();
  });

  // it('close matModal', () => {
  //   // component.close();
  //   fixture.detectChanges();
  //   // dialogRef.close(true);
  // });

});
