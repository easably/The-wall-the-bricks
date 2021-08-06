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
          logicalComponent: lg.componentName,
          logicalIndex: lgInd,
          emotionalComponent: eg.componentName,
          emotionalIndex: egInd,
          gameName: lg.name + ' & ' + eg.name
        });
      });
    });

    return result;
  }

  async getGameComponents(logicalindex: number, emotionalIndex: number) {
    return {
      logicalComponent: await logicalList[logicalindex].component(),
      emotionalComponent: await emotionalList[emotionalIndex].component()
    }
  }
}
