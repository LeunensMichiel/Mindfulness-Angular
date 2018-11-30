import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroepComponent } from './groep.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('GroepComponent', () => {
  let component: GroepComponent;
  let fixture: ComponentFixture<GroepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroepComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
