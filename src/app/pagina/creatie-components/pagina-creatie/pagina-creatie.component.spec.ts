import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCreatieComponent } from './pagina-creatie.component';

describe('PaginaCreatieComponent', () => {
  let component: PaginaCreatieComponent;
  let fixture: ComponentFixture<PaginaCreatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaCreatieComponent ]
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
