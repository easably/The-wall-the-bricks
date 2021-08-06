import { TestBed } from '@angular/core/testing';

import { MixBricksService } from './mix-bricks.service';

describe('MixBricksService', () => {
  let service: MixBricksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MixBricksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
