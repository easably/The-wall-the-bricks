import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainBridgeService {
  public result: Subject<number | 'finish' | 'wasted'> = new Subject();
  // public result: Subject<number | 'finish' | 'wasted'> = new Subject();

  constructor(
    private router: Router
  ) { }

  finishGame() {
    this.result.next('finish');
    this.gameEndNavigate('win');
  }

  wasteGame() {
    this.result.next('wasted');
    this.gameEndNavigate('lose');
  }

  private gameEndNavigate(mode: 'win' | 'lose') {
    setTimeout(() => {
      this.router.navigate(['/game-end'], {
        queryParams: { mode }
      });
    }, 990);
  }
}
