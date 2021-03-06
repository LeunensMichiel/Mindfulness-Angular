import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SessieLijstComponent} from '../sessie/sessie-lijst/sessie-lijst.component';
import {ExerciseListComponent} from '../exercise/exercise-list/exercise-list.component';
import {SessionmapListComponent} from '../sessionmaps/sessionmap-list/sessionmap-list.component';
import {SessionmapDetailComponent} from '../sessionmaps/sessionmap-detail/sessionmap-detail.component';
import {Sessionmapresolver} from '../sessionmaps/sessionmapresolver';
import {SessionResolver} from '../sessie/session-resolver.service';
import {GroepenListComponent} from '../groepen/groepen-list/groepen-list.component';
import {PaginaCreatieLijstComponent} from '../page/creatie-components/pagina-creatie-lijst/pagina-creatie-lijst.component';
import {AuthGuardService} from '../user/auth-guard.service';
import {ExerciseResolver} from '../exercise/exercise-resolver.service';
import {FeedbackListComponent} from '../feedback/feedback-list/feedback-list.component';
import {NotActiveComponent} from '../not-actif/not-active.component';
import {NotActiveAuthGuard} from '../not-actif/not-active-auth-guard.service';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';

/**
 * In this module we define all the routes in the AppModule
 */
const appRoutes: Routes = [
  {path: '', redirectTo: 'course-list', pathMatch: 'full'},
  {
    path: 'course-list',
    canActivate: [AuthGuardService],
    component: SessionmapListComponent
  },
  {
    path: 'exercise-list/:sessionID',
    component: ExerciseListComponent,
    canActivate: [AuthGuardService],
    resolve: {session: SessionResolver}},
  {
    path: 'groepen-list',
    canActivate: [AuthGuardService],
    component: GroepenListComponent},
  {
    path: 'page-list/:exerciseID/:session_id',
    component: PaginaCreatieLijstComponent,
    canActivate: [AuthGuardService],
    resolve: {exercise: ExerciseResolver}},
  {
    path: 'feedback',
    component:FeedbackListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'not-active',
    component: NotActiveComponent,
    canActivate: [NotActiveAuthGuard]
  },
  {
    path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}) //same
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
