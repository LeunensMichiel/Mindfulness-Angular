import { Component, OnInit, Input } from '@angular/core';
import { Page } from 'src/app/models/page.model';

@Component({
  selector: 'app-pagina-detail',
  templateUrl: './pagina-detail.component.html',
  styleUrls: ['./pagina-detail.component.css']
})
export class PaginaDetailComponent implements OnInit {
  @Input() public page: Page;

  constructor() { }

  ngOnInit() {
  }

}
