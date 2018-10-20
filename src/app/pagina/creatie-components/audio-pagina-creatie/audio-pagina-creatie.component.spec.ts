import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPaginaCreatieComponent } from './audio-pagina-creatie.component';

describe('AudioPaginaCreatieComponent', () => {
  let component: AudioPaginaCreatieComponent;
  let fixture: ComponentFixture<AudioPaginaCreatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPaginaCreatieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPaginaCreatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
