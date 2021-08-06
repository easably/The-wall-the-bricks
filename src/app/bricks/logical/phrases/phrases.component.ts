import { Component, OnInit } from '@angular/core';
import { SpeechRecognitionService } from 'src/app/services/speech-recogniton/speech-recognition.service';
import { SpeechResultEvaluationService } from 'src/app/services/speech-result-evaluaion/speech-result-evaluation.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';


@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.scss'],
})
export class PhrasesComponent implements OnInit {
  
  recognized : string[] = []
  source : string = "How can i help you?"

  isPulsing : boolean = false

  mark : number = 0;

  constructor(
    private speechRecogniton: SpeechRecognitionService,
    private speechResultEvaluation: SpeechResultEvaluationService
  ) { }
  
  ngOnInit() {
    this.speechRecogniton.speechResult.subscribe(result => {
      //end listening audio animation
      console.log(result);
      this.speechResultEvaluation.calculateMark(this.source, result)
    })

    this.speechResultEvaluation.speechMark.subscribe(result => {
      this.mark = result; 
    })

  }

  beginListening() {
    //listening audio animatiom
    this.speechRecogniton.start();
  }

  refresh () {
    this.mark = 0;
  }

  async listenExample() {
    await TextToSpeech.speak({ text: this.source }); 
  }


}
