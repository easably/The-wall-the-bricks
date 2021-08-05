import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.page.html',
  styleUrls: ['./game-end.page.scss'],
})
export class GameEndPage implements OnInit {
  mode: 'win' | 'lose' = null;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.mode = this.activatedRoute.snapshot.queryParams.mode;
  }

}
