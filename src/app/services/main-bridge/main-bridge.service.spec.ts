import { TestBed } from '@angular/core/testing';

import { MainBridgeService } from './main-bridge.service';

describe('MainBridgeService', () => {
  let service: MainBridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainBridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
