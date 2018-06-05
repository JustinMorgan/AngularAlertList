import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alert-details',
  templateUrl: './alert-details.component.html',
  styleUrls: ['./alert-details.component.css']
})
export class AlertDetailsComponent implements OnInit {
  @Input()
  public alert: Alert = null;

  constructor() { }

  ngOnInit() {
  }

}
