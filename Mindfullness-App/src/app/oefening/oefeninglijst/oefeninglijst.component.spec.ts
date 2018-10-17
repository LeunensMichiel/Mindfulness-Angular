import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OefeninglijstComponent } from './oefeninglijst.component';

describe('OefeninglijstComponent', () => {
  let component: OefeninglijstComponent;
  let fixture: ComponentFixture<OefeninglijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OefeninglijstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OefeninglijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
