import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPaginaDetailComponent } from './audio-pagina-detail.component';

describe('AudioPaginaDetailComponent', () => {
  let component: AudioPaginaDetailComponent;
  let fixture: ComponentFixture<AudioPaginaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPaginaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPaginaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
