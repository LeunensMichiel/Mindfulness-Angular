import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListItemDetailComponent } from './check-list-item-detail.component';

describe('CheckListItemDetailComponent', () => {
  let component: CheckListItemDetailComponent;
  let fixture: ComponentFixture<CheckListItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckListItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
