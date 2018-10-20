import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-pagina-creatie',
  templateUrl: './audio-pagina-creatie.component.html',
  styleUrls: ['./audio-pagina-creatie.component.css']
})
export class AudioPaginaCreatieComponent implements OnInit {
  public filePath:string = "";

  constructor() { }

  ngOnInit() {

  }

  uploadFile(event){
    this.filePath = event.target.value.split("\\").pop();
  }

}
