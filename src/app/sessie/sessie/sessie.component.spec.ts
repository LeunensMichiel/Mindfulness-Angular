import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessieComponent } from './sessie.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('SessieComponent', () => {
  let component: SessieComponent;
  let fixture: ComponentFixture<SessieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessieComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
