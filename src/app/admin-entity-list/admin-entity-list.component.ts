import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-admin-entity-list',
  templateUrl: './admin-entity-list.component.html',
  styleUrls: ['./admin-entity-list.component.css']
})
export class AdminEntityListComponent implements OnInit {
  @Input() keys: string[];
  @Input() prettyKeys: string[];
  @Input() entities = [];

  @Output() deleteEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();


  constructor() {
  }

  ngOnInit() {
  }

  edit(entity) {
    this.editEvent.emit(entity);
  }

  delete(entity) {
    this.deleteEvent.emit(entity);
  }

}
