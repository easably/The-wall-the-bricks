import { Component, OnInit } from '@angular/core';
import { SpeechRecognitionService } from 'src/app/services/speech-recogniton/speech-recognition.service';
import { SpeechResultEvaluationService } from 'src/app/services/speech-result-evaluaion/speech-result-evaluation.service';

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.scss'],
})
export class PhrasesComponent implements OnInit {
  
  recognized : string[] = []
  source : string = "How can i help you?"

  mark : number = 0;

  constructor(
    private speechRecogniton: SpeechRecognitionService,
    private speechResultEvaluation: SpeechResultEvaluationService
  ) { }
  
  ngOnInit() {
    this.speechRecogniton.speechResult.subscribe(result => {
      console.log(result);
      this.speechResultEvaluation.calculateMark(this.source, result)
    })
    this.speechResultEvaluation.speechMark.subscribe(result => {
      this.mark = result;
    })
  }

  beginListening() {
    this.speechRecogniton.start();
  }

  refresh () {

  }

  listenExample() {
    
  }


}
