import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroepenListComponent } from './groepen-list.component';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import { MatIconModule } from '@angular/material';

describe('GroepenListComponent', () => {
  let component: GroepenListComponent;
  let fixture: ComponentFixture<GroepenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroepenListComponent ],
      imports: [MatIconModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroepenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
