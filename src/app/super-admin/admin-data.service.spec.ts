import { TestBed } from '@angular/core/testing';

import { AdminDataService } from './admin-data.service';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

describe('AdminDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminDataService = TestBed.get(AdminDataService);
    expect(service).toBeTruthy();
  });
});
