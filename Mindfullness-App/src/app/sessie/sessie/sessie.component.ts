import { Component, OnInit, Input } from '@angular/core';
import { Sessie } from '../../models/sessie.model';

@Component({
  selector: 'app-sessie',
  templateUrl: './sessie.component.html',
  styleUrls: ['./sessie.component.css']
})
export class SessieComponent implements OnInit {

  @Input() public sessie: Sessie;

  constructor() { }

  ngOnInit() {
  }

}
