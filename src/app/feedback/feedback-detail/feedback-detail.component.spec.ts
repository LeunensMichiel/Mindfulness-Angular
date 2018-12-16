import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDetailComponent } from './feedback-detail.component';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import { MatIconModule } from '@angular/material';

describe('FeedbackDetailComponent', () => {
  let component: FeedbackDetailComponent;
  let fixture: ComponentFixture<FeedbackDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackDetailComponent ],
      imports: [MatIconModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
