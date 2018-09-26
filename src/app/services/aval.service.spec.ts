import { TestBed, inject } from '@angular/core/testing';

import { AvalService } from './aval.service';

describe('AvalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvalService]
    });
  });

  it('should be created', inject([AvalService], (service: AvalService) => {
    expect(service).toBeTruthy();
  }));
});
