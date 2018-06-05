import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Alert } from '../../models/alert';

function groupBy(list: any[], key: string): any[] {
  return list.reduce(function(result, listItem) {
    (result[listItem[key]] = result[listItem[key]] || []).push(listItem);
    return result;
  }, []);
}

@Component({
  selector: 'app-alert-filters',
  templateUrl: './alert-filters.component.html',
  styleUrls: ['./alert-filters.component.css']
})
export class AlertFiltersComponent implements OnInit, OnChanges {

  @Input()
  public alerts: Alert[];

  @Output()
  addFilter = new EventEmitter<any>();

  groups: any = {};

  keys = [
    'Severity',
    'Protocol',
    'ClientIP'
  ];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (this.alerts) {
      for (const key of this.keys) {
        this.groups[key] = Object.entries(groupBy(this.alerts, key));
      }
    }
  }

  onFilter(value, key) {
    this.addFilter.emit({value, key});
  }
}
