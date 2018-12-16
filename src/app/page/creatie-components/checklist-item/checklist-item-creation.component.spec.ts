import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistItemCreationComponent } from './checklist-item-creation.component';

import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import { MatIconModule } from '@angular/material';
describe('ChecklistItemCreationComponent', () => {
  let component: ChecklistItemCreationComponent;
  let fixture: ComponentFixture<ChecklistItemCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistItemCreationComponent ],
      imports: [MatIconModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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
