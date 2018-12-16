import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCreatieLijstComponent } from './pagina-creatie-lijst.component';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import { MatIconModule } from '@angular/material';

describe('PaginaCreatieLijstComponent', () => {
  let component: PaginaCreatieLijstComponent;
  let fixture: ComponentFixture<PaginaCreatieLijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaCreatieLijstComponent ],
      imports: [MatIconModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaCreatieLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
