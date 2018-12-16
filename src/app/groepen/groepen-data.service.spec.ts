import { TestBed } from '@angular/core/testing';

import { GroepenDataService } from './groepen-data.service';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

describe('GroepenDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroepenDataService = TestBed.get(GroepenDataService);
    expect(service).toBeTruthy();
  });
});
