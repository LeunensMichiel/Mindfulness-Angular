import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseCreationComponent } from './exercise-creation.component';

describe('ExerciseCreationComponent', () => {
  let component: ExerciseCreationComponent;
  let fixture: ComponentFixture<ExerciseCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseCreationComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
