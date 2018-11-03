import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraafCreatieComponent } from './paragraaf-creatie.component';

describe('ParagraafCreatieComponent', () => {
  let component: ParagraafCreatieComponent;
  let fixture: ComponentFixture<ParagraafCreatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParagraafCreatieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraafCreatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
