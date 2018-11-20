import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SessieLijstComponent } from '../sessie/sessie-lijst/sessie-lijst.component';
import { ExerciseListComponent } from '../exercise/exercise-list/exercise-list.component';
import { SessionmapListComponent } from '../sessionmaps/sessionmap-list/sessionmap-list.component';
import { SessionmapDetailComponent } from '../sessionmaps/sessionmap-detail/sessionmap-detail.component';
import { Sessionmapresolver } from '../sessionmaps/sessionmapresolver';
import { SessionResolver } from '../sessie/session-resolver.service';
import { GroepenListComponent } from '../groepen/groepen-list/groepen-list.component';
import { PaginaCreatieLijstComponent } from '../page/creatie-components/pagina-creatie-lijst/pagina-creatie-lijst.component';
import { ExerciseDetailComponent } from '../exercise/exercise-detail/exercise-detail.component';
import {AuthGuardService} from '../user/auth-guard.service';
import {ExerciseResolver} from '../exercise/exercise-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'course-list', pathMatch: 'full' },
  {
    path: 'course-list',
    canActivate: [AuthGuardService],
    component: SessionmapListComponent
  },
  { path: 'exercise-list/:sessionID', component: ExerciseListComponent, resolve: { session: SessionResolver } },
  {path:'groepen-list', component: GroepenListComponent},
  { path: 'page-list/:exerciseID', component: PaginaCreatieLijstComponent, resolve: { exercise: ExerciseResolver} }
  /*{ path: '**', component: PageNotFoundComponent}*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }) //same
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
