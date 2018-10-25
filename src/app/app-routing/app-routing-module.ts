import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SessieLijstComponent } from '../sessie/sessie-lijst/sessie-lijst.component';
import { OefeninglijstComponent } from '../oefening/oefeninglijst/oefeninglijst.component';

const appRoutes: Routes = [
    { path: 'sessie-list', component: SessieLijstComponent },
    { path: 'oefening-list', component: OefeninglijstComponent },
    { path: '', redirectTo: 'sessie-list', pathMatch: 'full'}/*,
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