import { TestBed } from '@angular/core/testing';

import { SuperAdminAuthGuard } from './super-admin-auth-guard.service';

describe('SuperAdminAuthGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuperAdminAuthGuard = TestBed.get(SuperAdminAuthGuard);
    expect(service).toBeTruthy();
  });
});
