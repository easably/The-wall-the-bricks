import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MixBricksService } from 'src/app/services/mix-bricks/mix-bricks.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  gamesList = [];

  constructor(
    private mixBricksService: MixBricksService,
    private router: Router
  ) { }

  ngOnInit() {
    this.gamesList = this.mixBricksService.getGamesList();
  }

  goGame(game) {
    console.log(game);
    this.router.navigate(['/game'], {
      queryParams: {
        ...game
      }
    });
  }
}
