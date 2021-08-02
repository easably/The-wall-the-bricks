import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GamePageRoutingModule } from './game-routing.module';
import { GamePage } from './game.page';
import { SynonymsModule } from 'src/app/components/logical/synonyms/synonyms.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule,
    SynonymsModule
  ],
  declarations: [
    GamePage
  ]
})
export class GamePageModule {}
