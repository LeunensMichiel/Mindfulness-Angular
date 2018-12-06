import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistItemCreationComponent } from './checklist-item-creation.component';

describe('ChecklistItemCreationComponent', () => {
  let component: ChecklistItemCreationComponent;
  let fixture: ComponentFixture<ChecklistItemCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistItemCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistItemCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
