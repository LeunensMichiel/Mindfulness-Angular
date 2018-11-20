import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroepenListComponent } from './groepen-list.component';

describe('GroepenListComponent', () => {
  let component: GroepenListComponent;
  let fixture: ComponentFixture<GroepenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroepenListComponent ]
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
