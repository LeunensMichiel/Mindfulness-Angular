import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SessieLijstComponent } from '../sessie/sessie-lijst/sessie-lijst.component';
import { OefeninglijstComponent } from '../oefening/oefeninglijst/oefeninglijst.component';
import {SessionmapListComponent} from '../sessionmaps/sessionmap-list/sessionmap-list.component';

const appRoutes: Routes = [
    { path: 'course-list', component: SessionmapListComponent },
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
