import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Alert } from './../../models/alert';

@Component({
  selector: 'app-alert-search',
  templateUrl: './alert-search.component.html',
  styleUrls: ['./alert-search.component.css']
})
export class AlertSearchComponent implements OnInit {

  @Output()
  search = new EventEmitter<any>();

  public searchString = '';

  constructor() { }

  ngOnInit() {
  }

  onKeyup() {
    const keys = ['AlertId', 'AlertTime', 'Severity', 'ClientIP', 'ServerIP', 'Protocol', 'ClientCountry'];
    const searchString = (this.searchString + '').toLowerCase();

    const filter = (alert: Alert) => keys.some(key => (alert[key] + '').toLowerCase().includes(searchString));

    this.search.emit(filter);
  }
}
