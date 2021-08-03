import { Component, OnInit } from '@angular/core';
import { MainBridgeService } from 'src/app/services/main-bridge/main-bridge.service';
import { SpeechKit } from '@ionic-native/speechkit/ngx';


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

  constructor(
    private mainBridgeService: MainBridgeService,
    private speechKit: SpeechKit
  ) { }

  ngOnInit() {
    this.getWord();
  }

  onSpeech() {
    this.speechKit.tts(this.levelData.guessWord, 'en', '').then(
      msg => console.log(msg),
      err => {
        const speech = new SpeechSynthesisUtterance(this.levelData.guessWord);
        const tts = window.speechSynthesis;
        tts.speak(speech);
      }
    );
    this.disableAnswerButtons = false;
  }

  onAnswer(buttonEl: HTMLButtonElement, word: string) {
    if (word === this.levelData.guessWord) {
      buttonEl.style.backgroundColor = '#62D38F';
      this.mainBridgeService.result.next(10);
    } else {
      buttonEl.style.backgroundColor = '#FF4E61';
      this.mainBridgeService.result.next(0);
    }
    this.disableNextButton = false;
    this.disableAnswerButtons = true;
  }

  nextLevel() {
    this.level++;

    if (DATA[this.level]) {
      this.getWord();
    } else {
      this.mainBridgeService.finishGame();
    }

    this.disableAnswerButtons = true;
    this.disableNextButton = true;
  }

  private getWord() {
    this.levelData.words = DATA[this.level];

    this.levelData.guessWord = this.levelData.words[Math.floor(Math.random() * 2)];
  }
}
