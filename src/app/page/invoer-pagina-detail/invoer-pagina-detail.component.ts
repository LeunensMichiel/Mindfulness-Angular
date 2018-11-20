import { Component, OnInit, Input } from '@angular/core';
import {  Page } from 'src/app/models/page.model';

@Component({
  selector: 'app-invoer-pagina-detail',
  templateUrl: './invoer-pagina-detail.component.html',
  styleUrls: ['./invoer-pagina-detail.component.css']
})
export class InvoerPaginaDetailComponent implements OnInit {
  @Input() page:Page = new Page();

  constructor() { }

  ngOnInit() {
  }

}
