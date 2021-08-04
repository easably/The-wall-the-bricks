import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainBridgeService } from 'src/app/services/main-bridge/main-bridge.service';

enum Scale {'-80deg', '-64deg', '-48deg', '-32deg', '-16deg', '0deg', '16deg', '32deg', '48deg', '64deg', '80deg' };

@Component({
  selector: 'app-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss'],
})
export class ScaleComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('arrow') scaleArrow: ElementRef<HTMLImageElement>;

  private resultSubscription: Subscription;

  constructor(
    private mainBridgeService: MainBridgeService
  ) { }

  ngOnInit() {
    this.resultSubscription = this.mainBridgeService.result.subscribe(data => {
      this.answer(data);
    });
  }

  ngOnDestroy() {
    this.resultSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    
  }

  private answer(value) {
    const scaleArrowEl = this.scaleArrow.nativeElement;

    scaleArrowEl.style.transform = `rotate(${Scale[value]})`;
  }
}
