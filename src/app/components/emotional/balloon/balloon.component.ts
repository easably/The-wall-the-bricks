import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainBridgeService } from 'src/app/services/main-bridge/main-bridge.service';

@Component({
  selector: 'app-balloon',
  templateUrl: './balloon.component.html',
  styleUrls: ['./balloon.component.scss'],
})
export class BalloonComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('balloon') private balloon: ElementRef<HTMLImageElement>;

  private resultSubscription: Subscription;

  constructor(
    private mainBridgeService: MainBridgeService
  ) { }

  ngOnInit() {
    this.resultSubscription = this.mainBridgeService.result.subscribe(data => {
      if (data > 4) {
        this.righthAnswer();
      } else {
        this.wrongAnswer();
      }
    });
  }

  ngAfterViewInit() {
    const balloonEl = this.balloon.nativeElement;
    this.initializeField(balloonEl);
  }

  ngOnDestroy() {
    this.resultSubscription.unsubscribe();
  }

  private initializeField(balloon: HTMLImageElement) {
    const leftMax = window.screen.width - 70;
    const left = Math.floor(Math.random() * leftMax);
    balloon.style.left = left + 'px';
  }

  private righthAnswer() {}

  private wrongAnswer() {
    const balloon = this.balloon.nativeElement;
    const step = (window.screen.height - 66 - balloon.offsetHeight) / 3;
    balloon.style.top = balloon.offsetTop + step + 'px';
  }
}
