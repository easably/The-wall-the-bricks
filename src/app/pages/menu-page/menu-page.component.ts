import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesList } from 'src/app/models/games-list.model';
import { MixBricksService } from 'src/app/services/mix-bricks/mix-bricks.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {
  gamesList: GamesList[] = [];

  constructor(
    private router: Router,
    private mixBricksService: MixBricksService
  ) { }

  ngOnInit(): void {
    this.gamesList = this.mixBricksService.getGamesList();
  }

  goGame(game: GamesList) {
    console.log(game);
    this.router.navigate(['/game'], {
      queryParams: {
        ...game
      }
    });
  }
}
