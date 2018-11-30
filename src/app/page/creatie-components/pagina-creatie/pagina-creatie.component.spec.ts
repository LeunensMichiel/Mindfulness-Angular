import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCreatieComponent } from './pagina-creatie.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('PaginaCreatieComponent', () => {
  let component: PaginaCreatieComponent;
  let fixture: ComponentFixture<PaginaCreatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaCreatieComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaCreatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
