import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { OefeningCreatieComponent } from './oefening/oefening-creatie/oefening-creatie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatTabsModule,
  MatSnackBarModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule
} from '@angular/material';
import { OefeningDetailComponent } from './oefening/oefening-detail/oefening-detail.component';
import { PaginaDetailComponent } from './pagina/pagina-detail/pagina-detail.component';
import {OefeninglijstComponent, RemoveExerciseDialog} from './oefening/oefeninglijst/oefeninglijst.component';
import { TekstPaginaDetailComponent } from './pagina/tekst-pagina-detail/tekst-pagina-detail.component';
import { AudioPaginaDetailComponent } from './pagina/audio-pagina-detail/audio-pagina-detail.component';
import { SessieComponent } from './sessie/sessie/sessie.component';
import {SessieLijstComponent, RemoveSessieDialog, SessieModifyComponent} from './sessie/sessie-lijst/sessie-lijst.component';
import { SessieDataService } from './sessie/sessie-data.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing-module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoerPaginaDetailComponent } from './pagina/invoer-pagina-detail/invoer-pagina-detail.component';
import { SessionmapListComponent } from './sessionmaps/sessionmap-list/sessionmap-list.component';
import { SessionmapCreatieComponent } from './sessionmaps/sessionmap-creatie/sessionmap-creatie.component';
import { SessionmapDetailComponent } from './sessionmaps/sessionmap-detail/sessionmap-detail.component';
import { SessionmapDataService } from './sessionmaps/sessionmap-data.service';
import { Sessionmapresolver } from './sessionmaps/sessionmapresolver';
import { PaginaCreatieComponent } from './pagina/creatie-components/pagina-creatie/pagina-creatie.component';
import { PaginaCreatieLijstComponent } from './pagina/creatie-components/pagina-creatie-lijst/pagina-creatie-lijst.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { AudioPaginaCreatieComponent } from './pagina/creatie-components/audio-pagina-creatie/audio-pagina-creatie.component';
import { InputPaginaCreatieComponent } from './pagina/creatie-components/input-pagina-creatie/input-pagina-creatie.component';
import { TekstPaginaCreatieComponent } from './pagina/creatie-components/tekst-pagina-creatie/tekst-pagina-creatie.component';
import { ParagraafCreatieComponent } from './pagina/creatie-components/paragraaf-creatie/paragraaf-creatie.component';
import { SessieToevoegenComponent } from './sessie/sessie-toevoegen/sessie-toevoegen.component';
import {SessieResolver} from './sessie/sessie-resolver';
import {FlexLayoutModule} from '@angular/flex-layout';
import { PageDataService } from './pagina/page-data.service';
import { PageResolver } from './pagina/page-resolver';
import {NgsRevealModule} from 'ngx-scrollreveal';
import {ExerciseDataService} from './oefening/exercise-data.service';
import { GroepenListComponent } from './groepen/groepen-list/groepen-list.component';
import { GroepCreatieComponent } from './groepen/groep-creatie/groep-creatie.component';
import { GroepComponent } from './groepen/groep/groep.component';

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
    SessieToevoegenComponent,
    SessionmapListComponent,
    SessionmapCreatieComponent,
    SessionmapDetailComponent,
    PaginaCreatieComponent,
    PaginaCreatieLijstComponent,
    AudioPaginaCreatieComponent,
    InputPaginaCreatieComponent,
    TekstPaginaCreatieComponent,
    ParagraafCreatieComponent,
    SessieModifyComponent,
    RemoveExerciseDialog,
    GroepenListComponent,
    GroepCreatieComponent,
    GroepComponent
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
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    ScrollDispatchModule,
    MatInputModule,
    MatExpansionModule,
    FlexLayoutModule,
    NgsRevealModule
  ],
  providers: [
    SessieDataService,
    SessionmapDataService,
    Sessionmapresolver,
    SessieResolver,
    PageDataService,
    PageResolver,
    ExerciseDataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [RemoveSessieDialog, SessionmapCreatieComponent, SessieModifyComponent, OefeningCreatieComponent, RemoveExerciseDialog]
})
export class AppModule { }
