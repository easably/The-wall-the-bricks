import { Injectable } from '@angular/core';
import { GamesList } from 'src/app/models/games-list.model';
import { emotionalList, logicalList } from 'src/app/bricks/bricks-list';


@Injectable({
  providedIn: 'root'
})
export class MixBricksService {


  constructor() { }

  getGamesList(): GamesList[] {
    const result: GamesList[] = [];

    logicalList.forEach((lg, lgInd) => {
      emotionalList.forEach((eg, egInd) => {
        result.push({
          logicalIndex: lgInd,
          emotionalIndex: egInd,
          gameName: lg.name + ' & ' + eg.name,
          gameDescription: lg.description
        });
      });
    });

    return result;
  }

  async getGameComponents(logicalindex: number, emotionalIndex: number) {
    const logicalBrick = logicalList[logicalindex];
    const emotionalBrick = emotionalList[emotionalIndex];
    const logicalModule = await logicalBrick.component();
    const emotionalModule = await emotionalBrick.component();

    return {
      logicalComponent: logicalModule[logicalBrick.componentName],
      emotionalComponent: emotionalModule[emotionalBrick.componentName]
    }
  }
}
