import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
