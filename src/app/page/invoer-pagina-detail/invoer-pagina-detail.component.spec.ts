import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoerPaginaDetailComponent } from './invoer-pagina-detail.component';

describe('InvoerPaginaDetailComponent', () => {
  let component: InvoerPaginaDetailComponent;
  let fixture: ComponentFixture<InvoerPaginaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoerPaginaDetailComponent ]
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
