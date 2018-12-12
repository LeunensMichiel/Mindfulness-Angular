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
      // a checkListItem message can not be longer than 30 characters
      message: ['', [Validators.maxLength(30)]]
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
   * This function adds a CheckListItem to the GenericCollection of the inputpage
   * If checkListItemForm is valid
   */
  onAddCheckListItem(): void {
    /**
     * Checks if checklistItem is valid and changed
     */
    if (this.checkListItemForm.valid && (this.checkListItemForm.dirty || this.checkListItemForm.touched)) {
      let position = this.inputPage.list.items.length;
      this.inputPage.list.addItem(new CheckListItem(position, this.checkListItemForm.value.message));
      this.changedPage.emit(this.inputPage);
      this.checkListItemForm.setValue({message: ''});
    }
  }

  /**
   * Set a nieuw changeItem in the GenericCollection of the inputpage
   * @param checkListItem
   */
  onChangeCheckListItem(checkListItem: CheckListItem): void {
    this.inputPage.list.changeItem(checkListItem);
    this.changedPage.emit(this.inputPage);
  }

  /**
   * Removes the given CheckListItem out of the GenericCollection
   * @param checkListItem
   */
  deleteCheckListItem(checkListItem: CheckListItem): void {
    this.inputPage.list.deleteItem(checkListItem.position);
    this.changedPage.emit(this.inputPage);
  }


  /**
   * This function sets the type of the InputPage
   * A InputPage can be [TEXT, IMAGE, MULTIPLE_CHOICE, EMPTY]
   * @param value
   */
  public setType(value) {
    this.inputPage.typeInput = InputPage.filterInputPage(value);
    this.changedPage.emit(this.inputPage);
  }

  /**
   * This function checks if the typeInput of the intputPage is Empty
   */
  public typeIsEmpty(): boolean {
    return this.inputPage.typeInput === TypeInputPage.EMPTY;
  }
}
