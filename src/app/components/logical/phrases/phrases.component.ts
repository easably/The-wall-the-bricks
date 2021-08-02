import { Component, OnInit } from '@angular/core';
import { SpeechRecognitionService } from 'src/app/services/speech-recogniton/speech-recognition.service';

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.scss'],
})
export class PhrasesComponent implements OnInit {
  
  recognized : string[] = []

  constructor(
    private speechRecogniton: SpeechRecognitionService
  ) { }
  
  ngOnInit() {
    this.speechRecogniton.speechResult.subscribe(result => {
      this.recognized = ["result completed"];
    })
  }

  beginListening() {
    this.speechRecogniton.start();
  }


}
