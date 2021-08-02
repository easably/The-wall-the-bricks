import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MixBricksService {
  private emotionalList = [
    {
      name: 'Balloon',
      component: () => import('src/app/components/emotional/balloon/balloon.component')
    },
    {
      name: 'Scale',
      component: () => import('src/app/components/emotional/scale/scale.component')
    },
    {
      name: 'Water',
      component: () => import('src/app/components/emotional/water/water.component')
    }
  ]
  private logicalList = [
    {
      name: 'Synonyms',
      component: () => import('src/app/components/logical/synonyms/synonyms.component')
    }
  ];

  constructor(
) { }

  getGamesList() {
    const result = [];

    this.logicalList.forEach((lg, lgInd) => {
      this.emotionalList.forEach((eg, egInd) => {
        result.push({
          logicalName: lg.name,
          logicalindex: lgInd,
          emotionalName: eg.name,
          emotionalIndex: egInd
        });
      });
    });

    return result;
  }

  async getGameComponents(logicalindex, emotionalIndex) {
    return {
      logicalComponent: await this.logicalList[logicalindex].component(),
      emotionalComponent: await this.emotionalList[emotionalIndex].component()
    }
  }
}
