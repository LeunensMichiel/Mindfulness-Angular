import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TekstPaginaDetailComponent } from './tekst-pagina-detail.component';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import { MatIconModule } from '@angular/material';

describe('TekstPaginaDetailComponent', () => {
  let component: TekstPaginaDetailComponent;
  let fixture: ComponentFixture<TekstPaginaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TekstPaginaDetailComponent ],
      imports: [MatIconModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TekstPaginaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
