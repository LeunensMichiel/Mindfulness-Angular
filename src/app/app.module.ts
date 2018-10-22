import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OefeningCreatieComponent } from './oefening/oefening-creatie/oefening-creatie.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule, MatCardModule, MatTabsModule, MatButtonToggleModule, MatInputModule} from '@angular/material';
import { OefeningDetailComponent } from './oefening/oefening-detail/oefening-detail.component';
import { PaginaDetailComponent } from './pagina/pagina-detail/pagina-detail.component';
import { OefeninglijstComponent } from './oefening/oefeninglijst/oefeninglijst.component';
import { TekstPaginaDetailComponent } from './pagina/tekst-pagina-detail/tekst-pagina-detail.component';
import { AudioPaginaDetailComponent } from './pagina/audio-pagina-detail/audio-pagina-detail.component';
import { InvoerPaginaDetailComponent } from './pagina/invoer-pagina-detail/invoer-pagina-detail.component';
import { PaginaCreatieComponent } from './pagina/creatie-components/pagina-creatie/pagina-creatie.component';
import { PaginaCreatieLijstComponent } from './pagina/creatie-components/pagina-creatie-lijst/pagina-creatie-lijst.component';
import { ScrollDispatchModule, ScrollDispatcher } from '@angular/cdk/scrolling';
import { AudioPaginaCreatieComponent } from './pagina/creatie-components/audio-pagina-creatie/audio-pagina-creatie.component';
import { InputPaginaCreatieComponent } from './pagina/creatie-components/input-pagina-creatie/input-pagina-creatie.component';
import { TekstPaginaCreatieComponent } from './pagina/creatie-components/tekst-pagina-creatie/tekst-pagina-creatie.component';
import { ParagraafCreatieComponent } from './pagina/creatie-components/paragraaf-creatie/paragraaf-creatie.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    OefeningCreatieComponent,
    OefeningDetailComponent,
    PaginaDetailComponent,
    OefeninglijstComponent,
    TekstPaginaDetailComponent,
    AudioPaginaDetailComponent,
    InvoerPaginaDetailComponent,
    PaginaCreatieComponent,
    PaginaCreatieLijstComponent,
    AudioPaginaCreatieComponent,
    InputPaginaCreatieComponent,
    TekstPaginaCreatieComponent,
    ParagraafCreatieComponent
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
    MatTabsModule,
    MatButtonToggleModule,
    ScrollDispatchModule,
    MatInputModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
