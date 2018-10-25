import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionmapCreatieComponent } from './sessionmap-creatie.component';

describe('SessionmapCreatieComponent', () => {
  let component: SessionmapCreatieComponent;
  let fixture: ComponentFixture<SessionmapCreatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionmapCreatieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionmapCreatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
