import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { GameEndComponent } from './game-end/game-end.component';


@NgModule({
  declarations: [
    MenuPageComponent,
    GamePageComponent,
    GameEndComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
