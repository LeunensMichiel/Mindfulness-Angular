import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ExerciseCreationComponent } from './exercise/exercise-creation/exercise-creation.component';
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
import { ExerciseDetailComponent } from './exercise/exercise-detail/exercise-detail.component';
import { PaginaDetailComponent } from './page/pagina-detail/pagina-detail.component';
import {ExerciseListComponent, RemoveExerciseDialog} from './exercise/exercise-list/exercise-list.component';
import { TekstPaginaDetailComponent } from './page/tekst-pagina-detail/tekst-pagina-detail.component';
import { AudioPaginaDetailComponent } from './page/audio-pagina-detail/audio-pagina-detail.component';
import { SessieComponent } from './sessie/sessie/sessie.component';
import {SessieLijstComponent, RemoveSessieDialog, SessieModifyComponent} from './sessie/sessie-lijst/sessie-lijst.component';
import { SessieDataService } from './sessie/sessie-data.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing-module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoerPaginaDetailComponent } from './page/invoer-pagina-detail/invoer-pagina-detail.component';
import { SessionmapListComponent } from './sessionmaps/sessionmap-list/sessionmap-list.component';
import { SessionmapCreatieComponent } from './sessionmaps/sessionmap-creatie/sessionmap-creatie.component';
import { SessionmapDetailComponent } from './sessionmaps/sessionmap-detail/sessionmap-detail.component';
import { SessionmapDataService } from './sessionmaps/sessionmap-data.service';
import { Sessionmapresolver } from './sessionmaps/sessionmapresolver';
import { PaginaCreatieComponent } from './page/creatie-components/pagina-creatie/pagina-creatie.component';
import { PaginaCreatieLijstComponent } from './page/creatie-components/pagina-creatie-lijst/pagina-creatie-lijst.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { AudioPaginaCreatieComponent } from './page/creatie-components/audio-pagina-creatie/audio-pagina-creatie.component';
import { InputPaginaCreatieComponent } from './page/creatie-components/input-pagina-creatie/input-pagina-creatie.component';
import { TekstPaginaCreatieComponent } from './page/creatie-components/tekst-pagina-creatie/tekst-pagina-creatie.component';
import { ParagraafCreatieComponent } from './page/creatie-components/paragraaf-creatie/paragraaf-creatie.component';
import { SessieToevoegenComponent } from './sessie/sessie-toevoegen/sessie-toevoegen.component';
import {SessionResolver} from './sessie/session-resolver.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import { PageDataService } from './page/page-data.service';
import {ExerciseDataService} from './exercise/exercise-data.service';
import {AuthGuardService} from './user/auth-guard.service';
import {AuthenticationService} from './user/authentication.service';
import {UserModule} from './user/user.module';
import {ExerciseResolver} from './exercise/exercise-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    ExerciseCreationComponent,
    ExerciseDetailComponent,
    PaginaDetailComponent,
    ExerciseListComponent,
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
    RemoveExerciseDialog
  ],
  imports: [
    BrowserModule,
    UserModule,
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
    FlexLayoutModule
  ],
  providers: [
    SessieDataService,
    SessionmapDataService,
    Sessionmapresolver,
    SessionResolver,
    ExerciseResolver,
    PageDataService,
    ExerciseDataService,
    AuthGuardService,
    AuthenticationService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RemoveSessieDialog,
    SessionmapCreatieComponent,
    SessieModifyComponent,
    ExerciseCreationComponent,
    RemoveExerciseDialog]
})
export class AppModule { }
