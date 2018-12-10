import {Component, Input, OnInit} from '@angular/core';
import {CheckListItem} from '../../models/CheckListItem';

@Component({
  selector: 'check-list-item-detail',
  templateUrl: './check-list-item-detail.component.html',
  styleUrls: ['./check-list-item-detail.component.css']
})
export class CheckListItemDetailComponent implements OnInit {
  @Input() checkListItem: CheckListItem;

  constructor() { }

  ngOnInit() {
  }

}
