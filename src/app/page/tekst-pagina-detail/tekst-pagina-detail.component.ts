import {Component, Input, OnInit} from '@angular/core';
import {Page, TextPage} from 'src/app/models/page.model';
import {Paragraph, TypeParagraph} from 'src/app/models/paragraph.model';

@Component({
  selector: 'app-tekst-pagina-detail',
  templateUrl: './tekst-pagina-detail.component.html',
  styleUrls: ['./tekst-pagina-detail.component.css']
})
export class TekstPaginaDetailComponent implements OnInit {
  @Input() page:Page;
  constructor() { }

  ngOnInit() {

    
  }

}
