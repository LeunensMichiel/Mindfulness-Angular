import { Component, OnInit, Input } from '@angular/core';
import { Page, TextPage } from 'src/app/models/page.model';
import { GenericItem } from 'src/app/models/GenericCollection.model';
import { Paragraph } from 'src/app/models/paragraph.model';

@Component({
  selector: 'app-tekst-pagina-detail',
  templateUrl: './tekst-pagina-detail.component.html',
  styleUrls: ['./tekst-pagina-detail.component.css']
})
export class TekstPaginaDetailComponent implements OnInit {
  @Input() page:Page = new TextPage()
  pars: Paragraph[];
  constructor() { }

  ngOnInit() {
    var tPar = new Paragraph();
    tPar.content = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui."
    tPar.type = "text";
    this.pars = [tPar, tPar, tPar, tPar]
    
  }

}
