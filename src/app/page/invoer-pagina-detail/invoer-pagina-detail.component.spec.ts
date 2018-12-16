import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoerPaginaDetailComponent } from './invoer-pagina-detail.component';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import { MatIconModule } from '@angular/material';

describe('InvoerPaginaDetailComponent', () => {
  let component: InvoerPaginaDetailComponent;
  let fixture: ComponentFixture<InvoerPaginaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoerPaginaDetailComponent ],
      imports: [MatIconModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoerPaginaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
