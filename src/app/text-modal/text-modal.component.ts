import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Subscription} from '../models/subscription';

declare var $: any;

@Component({
  selector: 'app-text-modal',
  templateUrl: './text-modal.component.html',
  styleUrls: ['./text-modal.component.css']
})
export class TextModalComponent implements OnChanges {
  @Input() title = '';
  @Input() content = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes.title && changes.title.firstChange) {
      return;
    }
    this.openModal();
  }

  openModal() {
    $('#textModal').modal('show');
  }

  closeModal() {
    $('#textModal').modal('hide');
  }

}
