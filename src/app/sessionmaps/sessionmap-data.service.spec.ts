import { TestBed } from '@angular/core/testing';

import { SessionmapDataService } from './sessionmap-data.service';

describe('SessionmapDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionmapDataService = TestBed.get(SessionmapDataService);
    expect(service).toBeTruthy();
  });
});
