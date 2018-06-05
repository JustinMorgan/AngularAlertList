import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alerts-table',
  templateUrl: './alerts-table.component.html',
  styleUrls: ['./alerts-table.component.css']
})
export class AlertsTableComponent implements OnInit {

  @Input()
  public alerts: Alert[];

  @Output()
  showDetail = new EventEmitter<any>();

  ngOnInit() {
  }

  rowClicked(alert) {
    this.showDetail.emit(alert);
  }
}
