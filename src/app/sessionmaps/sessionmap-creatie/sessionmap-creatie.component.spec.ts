import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionmapCreatieComponent } from './sessionmap-creatie.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('SessionmapCreatieComponent', () => {
  let component: SessionmapCreatieComponent;
  let fixture: ComponentFixture<SessionmapCreatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionmapCreatieComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionmapCreatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
