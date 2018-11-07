import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SessieLijstComponent } from '../sessie/sessie-lijst/sessie-lijst.component';
import { OefeninglijstComponent } from '../oefening/oefeninglijst/oefeninglijst.component';
import { SessionmapListComponent } from '../sessionmaps/sessionmap-list/sessionmap-list.component';
import { SessionmapDetailComponent } from '../sessionmaps/sessionmap-detail/sessionmap-detail.component';
import { Sessionmapresolver } from '../sessionmaps/sessionmapresolver';
import { SessieResolver } from '../sessie/sessie-resolver';

const appRoutes: Routes = [
  { path: '', redirectTo: 'course-list', pathMatch: 'full' },
  {
    path: 'course-list', component: SessionmapListComponent, children: [
      { path: 'course-list/:courseID', component: SessionmapDetailComponent, resolve: { sesmap: Sessionmapresolver } }
    ],
    //zodat sessies van sesmaps telkens herladen
    runGuardsAndResolvers: 'paramsChange'
  },
  {
    path: 'sessie-list', component: SessieLijstComponent, children: [
      { path: 'sessie-list/:sessieID', component: OefeninglijstComponent, resolve: { sessie: SessieResolver } }
    ]
  },
  { path: 'oefening-list/:sessieID', component: OefeninglijstComponent, resolve: { sessie: SessieResolver } },
  { path: 'oefening-list', component: OefeninglijstComponent }
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
