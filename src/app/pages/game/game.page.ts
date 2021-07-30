import { Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MixBricksService } from 'src/app/services/mix-bricks/mix-bricks.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  @ViewChild('logicalComponent', {read: ViewContainerRef}) logicalComponentView: ViewContainerRef;
  @ViewChild('emotionalComponent', {read: ViewContainerRef}) emotionalComponentView: ViewContainerRef;

  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private mixBricksService: MixBricksService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const game = this.activatedRoute.snapshot.queryParams;
    this.loadGameModules(game);
  }

  private async loadGameModules(game) {
    const { logicalindex, emotionalIndex } = game;
    const components = await this.mixBricksService.getGameComponents(logicalindex, emotionalIndex);
    const logicalComponent = components.logicalComponent[`${game.logicalName}Component`];
    const emotionalComponent = components.emotionalComponent[`${game.emotionalName}Component`];

    const logicalFactory = this.cfr.resolveComponentFactory(logicalComponent);
    const emotionalFactory = this.cfr.resolveComponentFactory(emotionalComponent);

    const logicalInstance = this.logicalComponentView.createComponent(logicalFactory, null, this.injector);
    const emotionalInstance = this.emotionalComponentView.createComponent(emotionalFactory, null, this.injector);

    console.log(logicalInstance);
    console.log(emotionalInstance);
  }

  clearComponents() {
    this.logicalComponentView.clear();
    this.emotionalComponentView.clear();
  }
}
