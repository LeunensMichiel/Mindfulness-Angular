import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionmapListComponent } from './sessionmap-list.component';

describe('SessionmapListComponent', () => {
  let component: SessionmapListComponent;
  let fixture: ComponentFixture<SessionmapListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionmapListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionmapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
