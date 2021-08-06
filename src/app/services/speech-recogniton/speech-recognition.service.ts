import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition-t';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  speechResult: Subject<string[]> = new Subject

  constructor() {}

  async start() {
    console.log(SpeechRecognition);
    if((await SpeechRecognition.available()).available) {
      if((await SpeechRecognition.hasPermission()).permission) {
        await this.startListening();
      }
      else {
        await SpeechRecognition.requestPermission()
      }
    }
    else {
      alert("speech recognition plugin not available on this device")
      return;
    }
  }

  async stopListening() {
    await SpeechRecognition.stop();
  }

  private async startListening() {
    let result = await SpeechRecognition.start({
      language:"en-US",
      maxResults: 5, 
    });
    await this.stopListening()
    let matches : string[] = [];
    result.matches.forEach(match => {
      matches.push(match.toString())
    });
    this.speechResult.next(matches);
  }
}
