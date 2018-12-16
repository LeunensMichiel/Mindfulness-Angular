import { TestBed } from '@angular/core/testing';

import { ExerciseDataService } from './exercise-data.service';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

describe('ExerciseDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExerciseDataService = TestBed.get(ExerciseDataService);
    expect(service).toBeTruthy();
  });
});
