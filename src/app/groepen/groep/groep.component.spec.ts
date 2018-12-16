import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroepComponent } from './groep.component';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import { MatIconModule } from '@angular/material';

describe('GroepComponent', () => {
  let component: GroepComponent;
  let fixture: ComponentFixture<GroepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroepComponent ],
      imports: [MatIconModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
