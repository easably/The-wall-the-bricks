import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition-t';
enum CatEmotion {
  Undefine,
  Excellent,
  Good,
  Sad
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  debugResult : any

  constructor() { }

  ngOnInit() {}

  async listenPhrase() {
    if((await SpeechRecognition.available()).available) {
      console.log("here1")
      if((await SpeechRecognition.hasPermission()).permission) {
        console.log("here2")
        let result = await SpeechRecognition.start({
          language: "en-US",
          maxResults: 5,
        })
        // .then((match) => {
        //   SpeechRecognition.stop()
        //   console.log("here3")
        //   this.debugResult = match.matches
        // }, (err) => { 
        //   SpeechRecognition.stop();
        //   alert(err);
        // })
        console.log("here3")
        SpeechRecognition.stop();
        console.log("here4");
        console.log("result: "+  result.matches)
        this.debugResult = result.matches;
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
  

}
