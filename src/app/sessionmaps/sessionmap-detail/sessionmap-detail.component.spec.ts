import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionmapDetailComponent } from './sessionmap-detail.component';

describe('SessionmapDetailComponent', () => {
  let component: SessionmapDetailComponent;
  let fixture: ComponentFixture<SessionmapDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionmapDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionmapDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
