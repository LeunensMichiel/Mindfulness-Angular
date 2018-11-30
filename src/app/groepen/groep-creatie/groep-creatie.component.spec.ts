import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroepCreatieComponent } from './groep-creatie.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('GroepCreatieComponent', () => {
  let component: GroepCreatieComponent;
  let fixture: ComponentFixture<GroepCreatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroepCreatieComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroepCreatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
