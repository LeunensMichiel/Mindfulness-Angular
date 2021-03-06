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
  MatExpansionModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatTableModule,
  MatMenuModule
} from '@angular/material';
import { SessieComponent, QrDialog, SessieModifyComponent } from './sessie/sessie/sessie.component';
import { ExerciseDetailComponent } from './exercise/exercise-detail/exercise-detail.component';
import { PaginaDetailComponent } from './page/pagina-detail/pagina-detail.component';
import {ExerciseListComponent, RemoveExerciseDialog} from './exercise/exercise-list/exercise-list.component';
import { TekstPaginaDetailComponent } from './page/tekst-pagina-detail/tekst-pagina-detail.component';
import { AudioPaginaDetailComponent } from './page/audio-pagina-detail/audio-pagina-detail.component';
import {SessieLijstComponent, RemoveSessieDialog} from './sessie/sessie-lijst/sessie-lijst.component';
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
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';

import { GroepenListComponent , GroupModifyComponent, RemoveGroupDialog} from './groepen/groepen-list/groepen-list.component';
import { AddUserToGroupDialog, QrGroupDialog } from './groepen/groep/groep.component';
import { SendNotifDialog } from './groepen/groep/groep.component';
import { AddGroupDialog } from './groepen/groepen-list/groepen-list.component'
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
import { ChecklistItemCreationComponent } from './page/creatie-components/checklist-item/checklist-item-creation.component';
import {SuperAdminAuthGuard} from './super-admin/super-admin-auth-guard.service';
import { NotActiveComponent } from './not-actif/not-active.component';
import {SuperAdminModule} from './super-admin/super-admin.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CheckListItemDetailComponent } from './page/check-list-item-detail/check-list-item-detail.component';
import { FeedbackPipePipe } from './feedback/feedback-pipe.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import { GroepFilterPipe } from './groepen/groep-filter.pipe';

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
    AddUserToGroupDialog,
    SendNotifDialog,
    RemoveGroupDialog,
    FeedbackListComponent,
    FeedbackDetailComponent,
    ParagraphDetailComponent,
    ChecklistItemCreationComponent,
    NotActiveComponent,
    PageNotFoundComponent,
    AddGroupDialog,
    PageNotFoundComponent,
    CheckListItemDetailComponent,
    FeedbackPipePipe,
    QrGroupDialog,
    GroepFilterPipe
  ],
  imports: [
    BrowserModule,
    UserModule,
    SuperAdminModule,
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
    MatSlideToggleModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTooltipModule
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
    AuthenticationService,
    SuperAdminAuthGuard
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
    RemoveGroupDialog,
    AddUserToGroupDialog,
    AddGroupDialog,
    SendNotifDialog,
    QrGroupDialog]
})
export class AppModule { }
