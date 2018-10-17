import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tekst-pagina-detail',
  templateUrl: './tekst-pagina-detail.component.html',
  styleUrls: ['./tekst-pagina-detail.component.css']
})
export class TekstPaginaDetailComponent implements OnInit {
  @Input() page:Page = new TextPage()

  constructor() { }

  ngOnInit() {
  }

}
