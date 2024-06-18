

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { GameRoutingModule } from "./game-routing.module";
import { GameComponent } from "./game.component";
import { SecondsminutesPipe } from "../pipes/secondsminutes.pipe";
import { MaterialModule } from "../shared/material.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        GameRoutingModule,
        SecondsminutesPipe
    ],
    declarations: [GameComponent],
})

export class GameModule { }