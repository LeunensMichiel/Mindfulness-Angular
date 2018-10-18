import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OefeningCreatieComponent } from './oefening-creatie.component';

describe('OefeningCreatieComponent', () => {
  let component: OefeningCreatieComponent;
  let fixture: ComponentFixture<OefeningCreatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OefeningCreatieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OefeningCreatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
