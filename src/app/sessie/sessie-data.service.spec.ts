import { TestBed } from '@angular/core/testing';

import { SessieDataService } from './sessie-data.service';

describe('SessieDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessieDataService = TestBed.get(SessieDataService);
    expect(service).toBeTruthy();
  });
});
