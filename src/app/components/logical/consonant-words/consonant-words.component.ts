import { Component, OnInit } from '@angular/core';
import { MainBridgeService } from 'src/app/services/main-bridge/main-bridge.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { Location } from '@angular/common';


const DATA: Array<[string, string]> = [
  ['red', 'read'],
  ['seen', 'scene'],
  ['brows', 'browse'],
  ['desert', 'dessert'],
  ['loose', 'lose'],
  ['quite', 'quiet'],
  ['dairy', 'diary'],
  ['career', 'carrier'],
  ['accept', 'except'],
  ['alone', 'along'],
];

@Component({
  selector: 'app-consonant-words',
  templateUrl: './consonant-words.component.html',
  styleUrls: ['./consonant-words.component.scss'],
})
export class ConsonantWordsComponent implements OnInit {
  disableAnswerButtons = true;
  disableNextButton = true;
  levelData = {
    words: [],
    guessWord: ''
  };
  private level: number = 0;
  private lives: number = 3;

  constructor(
    private mainBridgeService: MainBridgeService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getWord();
  }

  async onSpeech() {
    await TextToSpeech.speak({ text: this.levelData.guessWord });

    this.disableAnswerButtons = false;
  }

  onAnswer(buttonEl: HTMLButtonElement, word: string) {
    if (word === this.levelData.guessWord) {
      buttonEl.style.backgroundColor = '#62D38F';
      this.mainBridgeService.result.next(10);
      this.nextLevel();
    } else {
      buttonEl.style.backgroundColor = '#FF4E61';
      this.mainBridgeService.result.next(0);
      this.lives--;
      this.nextLevel();
    }
    this.disableNextButton = false;
    this.disableAnswerButtons = true;

    if (this.lives === 0) {
      this.mainBridgeService.wasteGame();
    }
  }

  private nextLevel() {
    setTimeout(() => {
      this.level++;
  
      if (DATA[this.level]) {
        this.getWord();
      } else {
        this.mainBridgeService.finishGame();
      }
  
      this.disableAnswerButtons = true;
      this.disableNextButton = true;
    }, 1000)
  }

  private getWord() {
    this.levelData.words = DATA[this.level];

    this.levelData.guessWord = this.levelData.words[Math.floor(Math.random() * 2)];
  }

  goBack() {
    this.location.back();
  }
}
