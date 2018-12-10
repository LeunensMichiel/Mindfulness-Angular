import { TestBed } from '@angular/core/testing';

import { NotActiveAuthGuard } from './not-active-auth-guard.service';

describe('NotActiveAuthGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotActiveAuthGuard = TestBed.get(NotActiveAuthGuard);
    expect(service).toBeTruthy();
  });
});
