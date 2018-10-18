import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDetailComponent } from './pagina-detail.component';

describe('PaginaDetailComponent', () => {
  let component: PaginaDetailComponent;
  let fixture: ComponentFixture<PaginaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaDetailComponent ]
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
