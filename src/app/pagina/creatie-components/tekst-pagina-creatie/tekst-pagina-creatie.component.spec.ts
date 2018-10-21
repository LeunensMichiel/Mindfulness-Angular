import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TekstPaginaCreatieComponent } from './tekst-pagina-creatie.component';

describe('TekstPaginaCreatieComponent', () => {
  let component: TekstPaginaCreatieComponent;
  let fixture: ComponentFixture<TekstPaginaCreatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TekstPaginaCreatieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TekstPaginaCreatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
