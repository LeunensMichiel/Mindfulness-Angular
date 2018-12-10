import { Component, OnInit, Input } from '@angular/core';
import {InputPage, TypeInputPage} from 'src/app/models/page.model';

@Component({
  selector: 'app-invoer-pagina-detail',
  templateUrl: './invoer-pagina-detail.component.html',
  styleUrls: ['./invoer-pagina-detail.component.css']
})
export class InvoerPaginaDetailComponent implements OnInit {
  @Input() page:InputPage;

  constructor() { }

  ngOnInit() {
  }

  getTypeInput() {
    return TypeInputPage;
  }

  public typeIsEmpty(): boolean {
    return this.page.typeInput === TypeInputPage.EMPTY;
  }

}
