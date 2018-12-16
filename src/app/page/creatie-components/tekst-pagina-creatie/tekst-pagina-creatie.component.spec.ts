import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TekstPaginaCreatieComponent } from './tekst-pagina-creatie.component';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import { MatIconModule } from '@angular/material';

describe('TekstPaginaCreatieComponent', () => {
  let component: TekstPaginaCreatieComponent;
  let fixture: ComponentFixture<TekstPaginaCreatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TekstPaginaCreatieComponent ],
      imports: [MatIconModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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
