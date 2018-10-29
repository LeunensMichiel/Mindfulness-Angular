import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPaginaCreatieComponent } from './input-pagina-creatie.component';

describe('InputPaginaCreatieComponent', () => {
  let component: InputPaginaCreatieComponent;
  let fixture: ComponentFixture<InputPaginaCreatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPaginaCreatieComponent ]
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
