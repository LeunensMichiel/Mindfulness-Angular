import { TestBed } from '@angular/core/testing';

import { DownloadService } from './download.service';

import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

describe('DownloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadService = TestBed.get(DownloadService);
    expect(service).toBeTruthy();
  });
});
