import { Component, OnInit } from '@angular/core';
import { Sessie } from '../../models/sessie.model';
import { SessieDataService } from '../sessie-data.service';

@Component({
  selector: 'app-sessie-lijst',
  templateUrl: './sessie-lijst.component.html',
  styleUrls: ['./sessie-lijst.component.css']
})
export class SessieLijstComponent implements OnInit {

  private _sessies: Sessie[];

  constructor(private _sessieDataService: SessieDataService) { }

  ngOnInit() {
  }

  get sessies() {
    return this._sessies;
  }
}
