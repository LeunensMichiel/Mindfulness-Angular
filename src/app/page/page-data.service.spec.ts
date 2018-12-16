import { TestBed } from '@angular/core/testing';

import { PageDataService } from './page-data.service';

import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
describe('PageDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageDataService = TestBed.get(PageDataService);
    expect(service).toBeTruthy();
  });
});
