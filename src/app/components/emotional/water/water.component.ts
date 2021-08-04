import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainBridgeService } from 'src/app/services/main-bridge/main-bridge.service';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss'],
})
export class WaterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('water') private water: ElementRef<HTMLDivElement>;

  private resultSubscription: Subscription;

  constructor(
    private mainBridgeService: MainBridgeService
  ) { }

  ngOnInit() {
    this.resultSubscription = this.mainBridgeService.result.subscribe(data => {
      if (data > 4) {
        this.rightAnswer();
      } else {
        this.wrongAnswer();
      }
    });
  }

  ngOnDestroy() {
    this.resultSubscription.unsubscribe();
  }

  ngAfterViewInit() {}

  private rightAnswer() {}

  private wrongAnswer() {
    const waterEl = this.water.nativeElement;
    const step = (window.screen.height - 56) / 3;
    waterEl.style.height = waterEl.offsetHeight + step + 'px';
  }
}
