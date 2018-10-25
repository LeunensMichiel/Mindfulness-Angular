import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SessieLijstComponent } from '../sessie/sessie-lijst/sessie-lijst.component';
import { OefeninglijstComponent } from '../oefening/oefeninglijst/oefeninglijst.component';
import {SessionmapListComponent} from '../sessionmaps/sessionmap-list/sessionmap-list.component';
import {SessionmapDetailComponent} from '../sessionmaps/sessionmap-detail/sessionmap-detail.component';
import {Sessionmapresolver} from '../sessionmaps/sessionmapresolver';

const appRoutes: Routes = [
    { path: 'course-list', component: SessionmapListComponent, children: [
        { path: 'course-list/:courseID', component: SessionmapDetailComponent, resolve: {sesmap: Sessionmapresolver}}
      ]},
         { path: 'sessie-list', component: SessieLijstComponent },
    { path: 'oefening-list', component: OefeninglijstComponent },
    { path: '', redirectTo: 'course-list', pathMatch: 'full'}/*,
    { path: '**', component: PageNotFoundComponent}*/
  
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
