import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameEndComponent } from './pages/game-end/game-end.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPageComponent
  },
  {
    path: 'game',
    component: GamePageComponent
  },
  {
    path: 'game-end',
    component: GameEndComponent
  },
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
