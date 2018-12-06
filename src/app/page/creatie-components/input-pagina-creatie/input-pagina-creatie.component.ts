import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InputPage, TypeInputPage} from 'src/app/models/page.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CheckListItem} from '../../../models/CheckListItem';
import {Insert} from '../../../models/Commands/insert.model';

@Component({
  selector: 'app-input-pagina-creatie',
  templateUrl: './input-pagina-creatie.component.html',
  styleUrls: ['./input-pagina-creatie.component.css']
})
export class InputPaginaCreatieComponent implements OnInit {
  /**
   * VARIABELEN:
   * changedpage: de emitter die de gewijzigde page naar page-creatie stuurt.
   * Die op zijn beurt naar de page-creatielijst stuurt waar ze dan word opgeslaan
   * in de databank
   */
  @Input() inputPage: InputPage;
  @Output() changedPage = new EventEmitter<InputPage>();
  public checkListItemForm: FormGroup;
  /**
   * GIDS:
   * page-creatie-lijst |
   *                      | page-creatie |
   *                                       | input-page-creatie
   */
  constructor(private _fb: FormBuilder) {
    this.checkListItemForm = this._fb.group({
      message: ["", [Validators.maxLength(30)]]
    });
  }

  ngOnInit() {
  }

  getTypeInput() {
    return TypeInputPage;
  }



  //================== METHODES ==================

  //------------ INPUTPAGE ATTRIBUTEN WIJZIGINGEN ------------

  /**
   * METHODES:
   * ngDoCheck: word getriggerd bij wijzigingen aan de lokale variabelen,
   * dus elke keer als de gebruiker iets wijzigt in de .html.
   * Als deze wijzigingen verschillend zijn van de attributen van de lokale page
   * worden deze de nieuwe waarden van de page. De page word dan geëmit om
   * te worden opgeslagen in het exercise-object
   */
  onAddCheckListItem(): void {
    if (this.checkListItemForm.valid && (this.checkListItemForm.dirty || this.checkListItemForm.touched)) {
      let position = this.inputPage.list.items.length;
      this.inputPage.list.addItem(new CheckListItem(position, this.checkListItemForm.value.message));
      this.changedPage.emit(this.inputPage);
      this.checkListItemForm.setValue({message: ""})
    }
  }

  onChangeCheckListItem(checkListItem: CheckListItem): void {
    this.inputPage.list.changeItem(checkListItem);
    this.changedPage.emit(this.inputPage);
  }

  deleteCheckListItem(checkListItem: CheckListItem): void {
    this.inputPage.list.deleteItem(checkListItem.position);
    this.changedPage.emit(this.inputPage);
  }

  public setType(value) {
    switch (value) {
      case "text":
        this.inputPage.typeInput = TypeInputPage.TEXT;
        break;
      case "image":
        this.inputPage.typeInput = TypeInputPage.IMAGE;
        break;
      case "multiple_choice":
        this.inputPage.typeInput = TypeInputPage.MULTIPLE_CHOICE;
        break;
    }
    this.changedPage.emit(this.inputPage);
  }

  public typeIsEmpty(): boolean {
    return this.inputPage.typeInput === TypeInputPage.EMPTY;
  }
}
