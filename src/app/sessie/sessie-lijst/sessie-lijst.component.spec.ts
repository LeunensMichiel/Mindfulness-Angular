import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessieLijstComponent } from './sessie-lijst.component';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import { MatIconModule } from '@angular/material';

describe('SessieLijstComponent', () => {
  let component: SessieLijstComponent;
  let fixture: ComponentFixture<SessieLijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessieLijstComponent ],
      imports: [MatIconModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessieLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
