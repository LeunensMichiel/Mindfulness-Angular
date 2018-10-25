import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OefeningCreatieComponent } from './oefening/oefening-creatie/oefening-creatie.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule, MatCardModule, MatTabsModule, MatSnackBarModule, MatButtonToggleModule, MatInputModule} from '@angular/material';
import { OefeningDetailComponent } from './oefening/oefening-detail/oefening-detail.component';
import { PaginaDetailComponent } from './pagina/pagina-detail/pagina-detail.component';
import { OefeninglijstComponent } from './oefening/oefeninglijst/oefeninglijst.component';
import { TekstPaginaDetailComponent } from './pagina/tekst-pagina-detail/tekst-pagina-detail.component';
import { AudioPaginaDetailComponent } from './pagina/audio-pagina-detail/audio-pagina-detail.component';
import { SessieComponent } from './sessie/sessie/sessie.component';
import { SessieLijstComponent } from './sessie/sessie-lijst/sessie-lijst.component';
import { SessieToevoegenComponent } from './sessie/sessie-toevoegen/sessie-toevoegen.component';
import { SessieDataService } from './sessie/sessie-data.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing-module';
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
    SessieComponent,
    SessieLijstComponent,
    SessieToevoegenComponent,
    PaginaCreatieComponent,
    PaginaCreatieLijstComponent,
    AudioPaginaCreatieComponent,
    InputPaginaCreatieComponent,
    TekstPaginaCreatieComponent,
    ParagraafCreatieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    ScrollDispatchModule,
    MatInputModule,
    DragDropModule
  ],
  providers: [SessieDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
