import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
