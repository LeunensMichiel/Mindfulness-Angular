import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroepComponent } from './groep.component';

describe('GroepComponent', () => {
  let component: GroepComponent;
  let fixture: ComponentFixture<GroepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroepComponent ]
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
