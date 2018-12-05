import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphDetailComponent } from './paragraph-detail.component';

describe('ParagraphDetailComponent', () => {
  let component: ParagraphDetailComponent;
  let fixture: ComponentFixture<ParagraphDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParagraphDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
