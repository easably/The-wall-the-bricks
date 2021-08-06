import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmotionalSpec } from 'src/app/models/brick-specification.model';
import { MainBridgeService } from 'src/app/services/main-bridge/main-bridge.service';

const brickSpec: EmotionalSpec = {
  name: 'Balloon',
  timeGame: true,
  position: 'full'
}

@Component({
  selector: 'app-balloon',
  templateUrl: './balloon.component.html',
  styleUrls: ['./balloon.component.scss']
})
export class BalloonComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('balloon') private balloon: ElementRef<HTMLImageElement>;

  private resultSubscription: Subscription;
  private lives: number = 3;

  constructor(
    private mainBridgeService: MainBridgeService
  ) { }

  ngOnInit(): void {
    this.resultSubscription = this.mainBridgeService.result.subscribe(data => {
      if (data > 4) {
        this.righthAnswer();
      } else {
        this.wrongAnswer();
      }
    });
  }

  ngOnDestroy(): void {
    this.resultSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    const balloonEl = this.balloon.nativeElement;
    this.initializeField(balloonEl);
  }

  getBrickInfo(): EmotionalSpec {
    return brickSpec;
  }

  initializeBrick(data) {
    this.lives = data.lives;
  }

  private initializeField(balloon: HTMLImageElement) {
    const leftMax = window.screen.width - 70;
    const left = Math.floor(Math.random() * leftMax);
    balloon.style.left = left + 'px';
  }

  private righthAnswer() {}

  private wrongAnswer() {
    const balloon = this.balloon.nativeElement;
    const step = (window.screen.height / 2 - balloon.offsetHeight) / this.lives;
    balloon.style.top = balloon.offsetTop + step + 'px';
  }
}
