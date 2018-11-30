import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPaginaCreatieComponent } from './input-pagina-creatie.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('InputPaginaCreatieComponent', () => {
  let component: InputPaginaCreatieComponent;
  let fixture: ComponentFixture<InputPaginaCreatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPaginaCreatieComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPaginaCreatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
