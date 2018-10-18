import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessieToevoegenComponent } from './sessie-toevoegen.component';

describe('SessieToevoegenComponent', () => {
  let component: SessieToevoegenComponent;
  let fixture: ComponentFixture<SessieToevoegenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessieToevoegenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessieToevoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
