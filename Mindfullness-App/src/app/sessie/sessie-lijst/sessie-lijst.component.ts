import { Component, OnInit } from '@angular/core';
import { Sessie } from '../../models/sessie.model';

@Component({
  selector: 'app-sessie-lijst',
  templateUrl: './sessie-lijst.component.html',
  styleUrls: ['./sessie-lijst.component.css']
})
export class SessieLijstComponent implements OnInit {

  private _sessies: Sessie[];

  constructor() { }

  ngOnInit() {
  }

  get sessies() {
    return this._sessies;
  }
}
