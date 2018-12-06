import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CheckListItem} from '../../../models/CheckListItem';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'checklist-item-creation',
  templateUrl: './checklist-item-creation.component.html',
  styleUrls: ['./checklist-item-creation.component.css']
})
export class ChecklistItemCreationComponent implements OnInit {
  @Input() checkListItem: CheckListItem;
  @Output() changedItem = new EventEmitter<CheckListItem>();
  @Output() deleteItem = new EventEmitter<CheckListItem>();
  public checkListItemForm: FormGroup;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit() {
    this.checkListItemForm = this._fb.group({
      message: [this.checkListItem.message, [Validators.maxLength(30)]]
    });
  }

  onChangeCheckListItem(): void {
    if ((this.checkListItemForm.touched || this.checkListItemForm.dirty) && this.checkListItemForm.valid) {
      this.checkListItem.message = this.checkListItemForm.value.message;
      this.changedItem.emit(this.checkListItem);
    }
  }

  deletePage() {
    this.deleteItem.emit(this.checkListItem);
  }
}
