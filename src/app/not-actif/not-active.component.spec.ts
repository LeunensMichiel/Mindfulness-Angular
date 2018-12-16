import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotActiveComponent } from './not-active.component';

import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import { MatIconModule } from '@angular/material';

describe('NotActiveComponent', () => {
  let component: NotActiveComponent;
  let fixture: ComponentFixture<NotActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotActiveComponent ],
      imports: [MatIconModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
