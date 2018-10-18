import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OefeningCreatieComponent } from './oefening/oefening-creatie/oefening-creatie.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule, MatCardModule, MatTabsModule} from '@angular/material';
import { OefeningDetailComponent } from './oefening/oefening-detail/oefening-detail.component';
import { PaginaDetailComponent } from './pagina/pagina-detail/pagina-detail.component';
import { OefeninglijstComponent } from './oefening/oefeninglijst/oefeninglijst.component';
import { TekstPaginaDetailComponent } from './pagina/tekst-pagina-detail/tekst-pagina-detail.component';
import { AudioPaginaDetailComponent } from './pagina/audio-pagina-detail/audio-pagina-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    OefeningCreatieComponent,
    OefeningDetailComponent,
    PaginaDetailComponent,
    OefeninglijstComponent,
    TekstPaginaDetailComponent,
    AudioPaginaDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
