import { Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesList } from 'src/app/models/games-list.model';
import { MixBricksService } from 'src/app/services/mix-bricks/mix-bricks.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  @ViewChild('logicalComponent', {read: ViewContainerRef}) logicalComponentView: ViewContainerRef;
  @ViewChild('emotionalComponent', {read: ViewContainerRef}) emotionalComponentView: ViewContainerRef;

  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private mixBricksService: MixBricksService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const game: GamesList = this.activatedRoute.snapshot.queryParams as GamesList;
    this.loadGameModules(game);
  }

  private async loadGameModules(game: GamesList) {
    const { logicalIndex, emotionalIndex } = game;
    const components = await this.mixBricksService.getGameComponents(logicalIndex, emotionalIndex);
    const logicalComponent = components.logicalComponent[game.logicalComponent];
    const emotionalComponent = components.emotionalComponent[game.emotionalComponent];

    const logicalFactory = this.cfr.resolveComponentFactory(logicalComponent);
    const emotionalFactory = this.cfr.resolveComponentFactory(emotionalComponent);

    const logicalInstance = this.logicalComponentView.createComponent(logicalFactory, undefined, this.injector).instance;
    const emotionalInstance = this.emotionalComponentView.createComponent(emotionalFactory, undefined, this.injector).instance;
// @ts-ignore
    console.log(emotionalInstance.getBrickInfo())
  }

  clearComponents() {
    this.logicalComponentView.clear();
    this.emotionalComponentView.clear();
  }
}
