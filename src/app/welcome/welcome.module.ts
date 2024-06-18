import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../shared/material.module";
import { WelcomeRoutingModule } from "./welcome-routing.module";
import { WelcomeComponent } from "./welcome.component";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        WelcomeRoutingModule
    ],
    declarations: [WelcomeComponent],
})

export class WelcomeModule { }