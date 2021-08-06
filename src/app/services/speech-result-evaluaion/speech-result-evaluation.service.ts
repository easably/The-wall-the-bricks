import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// TODO: Если пользователь сказал не всю фразу не возвращать оценку а выводить предупреждение
// TODO: Посмотреть другие методы оценки 
// TODO: Добавить возможность получение тех слов что сказаны неправильно  

export class SpeechResultEvaluationService {

  constructor() { }

  debugResult : string[] = []

  speechMark: Subject<number> = new Subject

  source : string
  recognized : string[]

  calculateMark(source : string, recognized : string[]) {
    this.source = source.toLowerCase().replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"");
    this.recognized = recognized;
    console.log(this.source);
    console.log(this.recognized);
    this.calculateWholePhrase()
  }

  calculateWholePhrase() {
    let closestTextToSource = "";
    let markSum = 0, bestMark = 0, bestIndex = 0, currentIndex = 0, currentMark = 0;
    this.recognized.forEach(element => {

      currentMark = 1 - this.calculateLevensteinDistance(this.source, 
        element.toLocaleLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")) / Math.max(this.source.length, element.length);

      markSum += currentMark;

      if(currentMark > bestMark) {
        bestIndex = currentIndex;
        bestMark = currentMark;
        closestTextToSource = element;
      }
      console.log(`${element} - mark: ${(currentMark * 10).toFixed(1)}`);
      currentIndex++;
    })

    if(this.recognized.length > 1) {
      this.speechMark.next((bestMark * (0.8 - bestIndex * 0.1) +  (0.2 + bestIndex * 0.1) * (markSum - bestMark)/(this.recognized.length - 1)) * 10);
    }
    else if(this.recognized.length = 1){
      this.speechMark.next(bestMark * 10);
    }
    else {
      this.speechMark.next(0)
    }
  }

  private calculateLevensteinDistance(source:string, target:string): number { //can be found faster solution
    if (!source) return target ? target.length : 0;
    else if (!target) return source.length;
    var m = source.length, n = target.length, INF = m+n, score = new Array(m+2), sd = {};
    for (var i = 0; i < m+2; i++) score[i] = new Array(n+2);
    score[0][0] = INF;
    for (var i = 0; i <= m; i++) {
        score[i+1][1] = i;
        score[i+1][0] = INF;
        sd[source[i]] = 0;
    }
    for (var j = 0; j <= n; j++) {
        score[1][j+1] = j;
        score[0][j+1] = INF;
        sd[target[j]] = 0;
    }
    for (var i = 1; i <= m; i++) {
        var DB = 0;
        for (var j = 1; j <= n; j++) {
            var i1 = sd[target[j-1]],
                j1 = DB;
            if (source[i-1] === target[j-1]) {
                score[i+1][j+1] = score[i][j];
                DB = j;
            }
            else {
                score[i+1][j+1] = Math.min(score[i][j], Math.min(score[i+1][j], score[i][j+1])) + 1;
            }
            score[i+1][j+1] = Math.min(score[i+1][j+1], score[i1] ? score[i1][j1] + (i-i1-1) + 1 + (j-j1-1) : Infinity);
        }
        sd[source[i-1]] = i;
    }
    return score[m+1][n+1];
  }
}
