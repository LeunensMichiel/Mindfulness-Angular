import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDetailComponent } from './pagina-detail.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('PaginaDetailComponent', () => {
  let component: PaginaDetailComponent;
  let fixture: ComponentFixture<PaginaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaDetailComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
