import { Component, OnInit } from '@angular/core';
import { EmotionalBrick } from 'src/app/interfaces/brick.interface';
import { brickProps } from 'src/app/types/brick.type';


@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss']
})
export class WaterComponent implements EmotionalBrick, OnInit {
  private _brickProps: brickProps = {
    name: 'Water',
    timeGame: true,
    viewPosition: 'full'
  }

  constructor() {}

  ngOnInit() {}

  initializeBrick(initData) {
    console.log('init data', initData);
  }

  get brickProps(): brickProps {
    return this._brickProps;
  }

  set brickState(value) {
    console.log('value', value);
  }
}
