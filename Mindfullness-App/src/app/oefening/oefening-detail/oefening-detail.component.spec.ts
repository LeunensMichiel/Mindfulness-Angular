import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OefeningDetailComponent } from './oefening-detail.component';

describe('OefeningDetailComponent', () => {
  let component: OefeningDetailComponent;
  let fixture: ComponentFixture<OefeningDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OefeningDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OefeningDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
