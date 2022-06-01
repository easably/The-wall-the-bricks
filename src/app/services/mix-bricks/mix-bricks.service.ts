import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MixBricksService {
  private emotionalList = [
    {
      name: 'Balloon',
      component: () => import('src/app/components/emotional/balloon/balloon.component'),
      pictures: '/assets/icon/ballon-icon.svg'
    },
    {
      name: 'Scale',
      component: () => import('src/app/components/emotional/scale/scale.component'),
      pictures: '/assets/icon/scale-icon.svg'

    },
    {
      name: 'Water',
      component: () => import('src/app/components/emotional/water/water.component'),
      pictures: '/assets/icon/wave-icon.svg'
    }
  ]
  private logicalList = [
    {
      name: 'Synonyms',
      nameDisplayed: 'Synonyms',
      component: () => import('src/app/components/logical/synonyms/synonyms.component'),
    },
    {
      name: 'ConsonantWords',
      nameDisplayed: 'Similar Words',
      component: () => import('src/app/components/logical//consonant-words/consonant-words.component'),
    },
  ];

  constructor(
) { }

  getGamesList() {
    const result = [];
    const color = (nameGame: string) => {
        switch (nameGame) {
          case "Synonyms & Balloon":return {backgroundColor: "#1DBFB7", borderColor: "#1B9F99"}
          case "Synonyms & Scale": return  {backgroundColor: "#ED9C3D" , borderColor:"#D08124"}
          case "Synonyms & Water":return  {backgroundColor: "#A87BD9" , borderColor:"#8C5BC2"}
          case "Similar Words & Balloon": return {backgroundColor: "#36A2E1" , borderColor:"#2983B8"}
          case "Similar Words & Scale": return  {backgroundColor:"#EA8DAE" , borderColor:"#CB557F"}
          case "Similar Words & Water": return {backgroundColor: "#D53E49", borderColor: "#9F3A42"}
          default: return "#fff"
        }
    }
    this.logicalList.forEach((lg, lgInd) => {
      this.emotionalList.forEach((eg, egInd) => {
        result.push({
          color: color(lg.nameDisplayed + ' & ' + eg.name),
          picPath: eg.pictures,
          logicalName: lg.name,
          logicalindex: lgInd,
          emotionalName: eg.name,
          emotionalIndex: egInd,
          gameName: lg.nameDisplayed + ' & ' + eg.name
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
