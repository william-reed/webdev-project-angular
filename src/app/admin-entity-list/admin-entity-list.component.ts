import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-admin-entity-list',
  templateUrl: './admin-entity-list.component.html',
  styleUrls: ['./admin-entity-list.component.css']
})
export class AdminEntityListComponent implements OnInit {
  @Input() keys: string[];
  @Input() entities = [];

  @Output() onDelete = new EventEmitter();
  @Output() onEdit = new EventEmitter();


  constructor() {
  }

  ngOnInit() {
  }

  getValues(entity) {
    const values = [];
    for (const key of this.keys) {
      values.push(entity[key]);
    }

    let value = '';
    for (const val of values) {
      value += val + ' ';
    }

    return value;
  }

  edit(entity) {
    this.onEdit.emit(entity);
  }

  delete(entity) {
    this.onDelete.emit(entity);
  }

}
