import { TestBed } from '@angular/core/testing';

import { OefeningDataService } from './oefening-data.service';

describe('OefeningDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OefeningDataService = TestBed.get(OefeningDataService);
    expect(service).toBeTruthy();
  });
});
