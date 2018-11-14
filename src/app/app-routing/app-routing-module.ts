import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SessieLijstComponent } from '../sessie/sessie-lijst/sessie-lijst.component';
import { ExerciseListComponent } from '../oefening/exercise-list/exercise-list.component';
import { SessionmapListComponent } from '../sessionmaps/sessionmap-list/sessionmap-list.component';
import { SessionmapDetailComponent } from '../sessionmaps/sessionmap-detail/sessionmap-detail.component';
import { Sessionmapresolver } from '../sessionmaps/sessionmapresolver';
import { SessionResolver } from '../sessie/session-resolver.service';
import { PaginaCreatieLijstComponent } from '../pagina/creatie-components/pagina-creatie-lijst/pagina-creatie-lijst.component';
import { OefeningDetailComponent } from '../oefening/oefening-detail/oefening-detail.component';
import { PageResolver } from '../pagina/page-resolver';

const appRoutes: Routes = [
  { path: '', redirectTo: 'course-list', pathMatch: 'full' },
  { path: 'course-list', component: SessionmapListComponent},
  { path: 'sessie-list', component: SessieLijstComponent},
  { path: 'exercise-list/:sessionID', component: ExerciseListComponent, resolve: { session: SessionResolver } },
  { path: 'page-list/:exerciseID', component: PaginaCreatieLijstComponent, resolve: { exercise: PageResolver} },
  { path: 'oefening-list', component: ExerciseListComponent }
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
