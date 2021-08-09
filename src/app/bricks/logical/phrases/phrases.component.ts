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

  mark : number = 0;

  isRecognitionStarted : boolean = false

  constructor(
    private speechRecogniton: SpeechRecognitionService,
    private speechResultEvaluation: SpeechResultEvaluationService
  ) { }
  
  ngOnInit() {
    this.speechRecogniton.isListening.subscribe(isListening => {
      this.isRecognitionStarted = isListening
    })

    this.speechRecogniton.speechResult.subscribe(result => {
      this.speechRecogniton.stopListening()
      this.isRecognitionStarted = false
      console.log("recogniton stopped")
      console.log("Result:" + result);
      this.speechResultEvaluation.calculateMark(this.source, result)
    })

    this.speechResultEvaluation.speechMark.subscribe(result => {
      this.mark = result; 
    })

  }

  onListening() {
    if(!this.isRecognitionStarted) {
      this.speechRecogniton.start()
      console.log("recognition started")
    } 
    else {
      this.speechRecogniton.stopListening()
      console.log("recogniton stopped")
    } 
  }

  refresh () {
    this.mark = 0;
  }

  async listenExample() {
    await TextToSpeech.speak({ text: this.source }); 
  }


}
