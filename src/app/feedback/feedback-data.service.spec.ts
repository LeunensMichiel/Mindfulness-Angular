import { TestBed } from '@angular/core/testing';

import { FeedbackDataService } from './feedback-data.service';

describe('FeedbackDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeedbackDataService = TestBed.get(FeedbackDataService);
    expect(service).toBeTruthy();
  });
});
