import { Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmotionalBrick, LogicalBrick } from 'src/app/interfaces/brick.interface';
import { GamesList } from 'src/app/models/games-list.model';
import { MixBricksService } from 'src/app/services/mix-bricks/mix-bricks.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit, OnDestroy {
  @ViewChild('logicalComponent', {read: ViewContainerRef}) logicalComponentView: ViewContainerRef;
  @ViewChild('emotionalComponent', {read: ViewContainerRef}) emotionalComponentView: ViewContainerRef;

  game: GamesList;

  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private mixBricksService: MixBricksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.game = this.activatedRoute.snapshot.queryParams as GamesList;
    this.loadGameModules(this.game);
  }

  ngOnDestroy(): void {
    this.clearComponents();
  }

  private async loadGameModules(game: GamesList) {
    const { logicalIndex, emotionalIndex } = game;
    const components = await this.mixBricksService.getGameComponents(logicalIndex, emotionalIndex);

    const logicalFactory = this.cfr.resolveComponentFactory(components.logicalComponent);
    const emotionalFactory = this.cfr.resolveComponentFactory(components.emotionalComponent);
    
    const logicalComponentRef = this.logicalComponentView.createComponent(logicalFactory, undefined, this.injector);
    const logicalInstance = logicalComponentRef.instance as LogicalBrick;
    logicalComponentRef.location.nativeElement.className = 'logical-component';

    const emotionalComponentRef = this.emotionalComponentView.createComponent(emotionalFactory, undefined, this.injector);
    const emotionalInstance = emotionalComponentRef.instance as EmotionalBrick;
    emotionalComponentRef.location.nativeElement.className = 'emotional-component';

    logicalInstance.initialize(emotionalInstance);
  }

  private clearComponents() {
    this.logicalComponentView.clear();
    this.emotionalComponentView.clear();
  }

  goMainMenu() {
    this.clearComponents();
    this.router.navigateByUrl('/menu');
  }
}
