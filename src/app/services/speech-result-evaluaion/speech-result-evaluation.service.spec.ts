import { TestBed } from '@angular/core/testing';

import { SpeechResultEvaluationService } from './speech-result-evaluation.service';

describe('SpeechResultEvaluationService', () => {
  let service: SpeechResultEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeechResultEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
