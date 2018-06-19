import {Component, Input, OnInit} from '@angular/core';
import {Alert} from '../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() alerts: Alert[] = [];

  constructor() {}

  ngOnInit() {}

}
