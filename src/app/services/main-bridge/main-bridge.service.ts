import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainBridgeService {
  public result: Subject<number> = new Subject();

  constructor() { }
}
