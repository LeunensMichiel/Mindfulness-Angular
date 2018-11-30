import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
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
  MatExpansionModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule
} from '@angular/material';
import { SessieComponent, QrDialog } from './sessie/sessie/sessie.component';
import { ExerciseDetailComponent } from './exercise/exercise-detail/exercise-detail.component';
import { PaginaDetailComponent } from './page/pagina-detail/pagina-detail.component';
import {ExerciseListComponent, RemoveExerciseDialog} from './exercise/exercise-list/exercise-list.component';
import { TekstPaginaDetailComponent } from './page/tekst-pagina-detail/tekst-pagina-detail.component';
import { AudioPaginaDetailComponent } from './page/audio-pagina-detail/audio-pagina-detail.component';
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

import { GroepenListComponent , GroupModifyComponent, RemoveGroupDialog} from './groepen/groepen-list/groepen-list.component';
import { GroepCreatieComponent } from './groepen/groep-creatie/groep-creatie.component';
import { GroepComponent } from './groepen/groep/groep.component';
import {MatSelectModule} from '@angular/material/select';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { PageDataService } from './page/page-data.service';
import {ExerciseDataService} from './exercise/exercise-data.service';
import {AuthGuardService} from './user/auth-guard.service';
import {AuthenticationService} from './user/authentication.service';
import {UserModule} from './user/user.module';
import {ExerciseResolver} from './exercise/exercise-resolver.service';
import {basehttpInterceptorProviders, httpInterceptorProviders} from './http-interceptors';
import {DownloadService} from './download.service';
import { FeedbackListComponent } from './feedback/feedback-list/feedback-list.component';
import { FeedbackDetailComponent } from './feedback/feedback-detail/feedback-detail.component';
import {FeedbackDataService} from './feedback/feedback-data.service';
import { ParagraphDetailComponent } from './page/paragraph-detail/paragraph-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackDetailComponent,
    FeedbackListComponent,
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
    RemoveExerciseDialog,
    GroepenListComponent,
    GroepCreatieComponent,
    GroepComponent,
    QrDialog,
    GroepComponent,
    GroupModifyComponent,
    RemoveGroupDialog,
    FeedbackListComponent,
    FeedbackDetailComponent,
    ParagraphDetailComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
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
    NgxQRCodeModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule
  ],
  providers: [
    basehttpInterceptorProviders,
    httpInterceptorProviders,
    FeedbackDataService,
    DownloadService,
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
    RemoveExerciseDialog,
    SessieComponent,
    QrDialog,
    RemoveExerciseDialog,
    GroupModifyComponent,
    RemoveGroupDialog]
})
export class AppModule { }
