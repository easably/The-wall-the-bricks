import { Component, OnInit } from '@angular/core';
import { EmotionalBrick, LogicalBrick } from 'src/app/interfaces/brick.interface';
import { MainBridgeService } from 'src/app/services/main-bridge/main-bridge.service';
import { brickProps, emotionalBrickInitializationData } from 'src/app/types/brick.type';

interface SynonymsData {
  target: string;
  synonyms: Synonym[];
}
interface Synonym {
  word: string;
  isRight: boolean;
}

const wordsData: SynonymsData[] = [
  { target: 'adore', synonyms: [{ word: 'love', isRight: true }, { word: 'desire', isRight: false }, { word: 'celebrate', isRight: false }] },
  { target: 'amuse', synonyms: [{ word: 'amaze', isRight: true }, { word: 'entertain', isRight: false }, { word: 'exaggerate', isRight: false }] },
  { target: 'astonish', synonyms: [{ word: 'surprise', isRight: true }, { word: 'guess', isRight: false }, { word: 'pack', isRight: false }] },
  { target: 'fasten', synonyms: [{ word: 'tie', isRight: true }, { word: 'feed', isRight: false }, { word: 'dress', isRight: false }] },
  { target: 'frighten', synonyms: [{ word: 'scare', isRight: true }, { word: 'disturb', isRight: false }, { word: 'comfort', isRight: false }] },
  { target: 'hug', synonyms: [{ word: 'embrace', isRight: true }, { word: 'hand', isRight: false }, { word: 'wave', isRight: false }] },
  { target: 'obtain', synonyms: [{ word: 'get', isRight: true }, { word: 'build', isRight: false }, { word: 'skip', isRight: false }] },
  { target: 'select', synonyms: [{ word: 'choose', isRight: true }, { word: 'display', isRight: false }, { word: 'discover', isRight: false }] },
  { target: 'alter', synonyms: [{ word: 'change', isRight: true }, { word: 'repair', isRight: false }, { word: 'make up', isRight: false }] },
  { target: 'affect', synonyms: [{ word: 'influence', isRight: true }, { word: 'include', isRight: false }, { word: 'improve', isRight: false }] }
]

@Component({
  selector: 'app-synonyms',
  templateUrl: './synonyms.component.html',
  styleUrls: ['./synonyms.component.scss']
})
export class SynonymsComponent implements LogicalBrick, OnInit {
  levelData: SynonymsData;
  isCanChoose: boolean = true;
  
  emotionalComponent: EmotionalBrick;
  private currentLevel: number = 0;
  private lives: number = 3;
  private levelLength = 3;

  constructor(
    private mainBridgeService: MainBridgeService
  ) { }

  ngOnInit(): void {}

  initialize(component: EmotionalBrick) {
    this.emotionalComponent = component;

    this.levelData = wordsData[this.currentLevel];
    this.levelData.synonyms = this.mixWords(this.levelData.synonyms);

    const brickProps: brickProps = component.brickProps;
    const emotionalInitData: emotionalBrickInitializationData = {}

    if (brickProps.timeGame) {
      emotionalInitData.gameTimer = this.levelLength;
    }

    this.emotionalComponent.initializeBrick(emotionalInitData);
  }

  onAnswer(button: HTMLButtonElement, synonym: Synonym) {
    if (this.isCanChoose) {
      this.isCanChoose = false;
      if (synonym.isRight) {
        button.style.backgroundColor = '#89ff89';
        this.rigthAnswer(10);
      } else {
        button.style.backgroundColor = '#ff8989';
        this.wrongAnswer(0);
        this.lives--;
      }
      setTimeout(this.nextLevel.bind(this), 1000);
    }

    if (this.lives === 0) {
      this.mainBridgeService.wasteGame();
    }
  }

  private mixWords(data: Synonym[]): Synonym[] {
    const plugArray = new Array(data.length).fill(false);
    const synonymsMixed: Synonym[] = [];

    data.forEach(el => {
      const index = this.getRandomValue(plugArray);

      synonymsMixed[index] = el;
    });

    return synonymsMixed;
  }

  private getRandomValue(arr) {
    while(true) {
      const val = Math.floor(Math.random() * arr.length);
      if (arr[val] === false) {
        arr[val] = true;
        return val;
      }
    }
  }

  private rigthAnswer(value: number) {
    this.emotionalComponent.brickState = value;
  }

  private wrongAnswer(value: number) {
    this.emotionalComponent.brickState = value;
  }

  private nextLevel() {
    this.currentLevel++;
    if (wordsData[this.currentLevel]) {
      this.isCanChoose = true;
      this.levelData = wordsData[this.currentLevel]
      this.levelData.synonyms = this.mixWords(this.levelData.synonyms);
    } else {
      this.mainBridgeService.finishGame();
    }
  }
}
