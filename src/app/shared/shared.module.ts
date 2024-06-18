import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { TutorialModalComponent } from "./tutorial-modal/tutorial-modal.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [TutorialModalComponent],
})

export class SharedModule { }