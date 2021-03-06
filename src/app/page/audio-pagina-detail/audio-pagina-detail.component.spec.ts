import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPaginaDetailComponent } from './audio-pagina-detail.component';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import { MatIconModule } from '@angular/material';

describe('AudioPaginaDetailComponent', () => {
  let component: AudioPaginaDetailComponent;
  let fixture: ComponentFixture<AudioPaginaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPaginaDetailComponent ],
      imports: [MatIconModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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
