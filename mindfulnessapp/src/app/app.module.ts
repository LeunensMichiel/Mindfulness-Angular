import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SessieComponent } from './sessie/sessie/sessie.component';
import { SessieToevoegenComponent } from './sessie/sessie-toevoegen/sessie-toevoegen.component';
import { SessieLijstComponent } from './sessie/sessie-lijst/sessie-lijst.component';

@NgModule({
  declarations: [
    AppComponent,
    SessieComponent,
    SessieToevoegenComponent,
    SessieLijstComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
