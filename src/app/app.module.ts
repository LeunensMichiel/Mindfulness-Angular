import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OefeningCreatieComponent } from './oefening/oefening-creatie/oefening-creatie.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule, MatCardModule, MatTabsModule, MatSnackBarModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { OefeningDetailComponent } from './oefening/oefening-detail/oefening-detail.component';
import { PaginaDetailComponent } from './pagina/pagina-detail/pagina-detail.component';
import { OefeninglijstComponent } from './oefening/oefeninglijst/oefeninglijst.component';
import { TekstPaginaDetailComponent } from './pagina/tekst-pagina-detail/tekst-pagina-detail.component';
import { AudioPaginaDetailComponent } from './pagina/audio-pagina-detail/audio-pagina-detail.component';
import { SessieComponent } from './sessie/sessie/sessie.component';
import { SessieLijstComponent, RemoveSessieDialog } from './sessie/sessie-lijst/sessie-lijst.component';
import { SessieDataService } from './sessie/sessie-data.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing-module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule }from '@angular/forms';
import {InvoerPaginaDetailComponent} from './pagina/invoer-pagina-detail/invoer-pagina-detail.component';
import {SessionmapListComponent} from './sessionmaps/sessionmap-list/sessionmap-list.component';
import {SessionmapCreatieComponent} from './sessionmaps/sessionmap-creatie/sessionmap-creatie.component';
import {SessionmapDetailComponent} from './sessionmaps/sessionmap-detail/sessionmap-detail.component';
import {SessionmapDataService} from './sessionmaps/sessionmap-data.service';

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
    RemoveSessieDialog,
    SessionmapListComponent,
    SessionmapCreatieComponent,
    SessionmapDetailComponent
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SessieDataService, SessionmapDataService],
  bootstrap: [AppComponent],
  entryComponents: [RemoveSessieDialog]
})
export class AppModule { }
