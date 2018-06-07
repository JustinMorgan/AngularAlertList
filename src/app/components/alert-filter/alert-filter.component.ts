import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Alert } from '../../models/alert';

function groupBy(list: any[], key: string): any[] {
  return list.reduce(function(result, listItem) {
    (result[listItem[key]] = result[listItem[key]] || []).push(listItem);
    return result;
  }, {});
}

@Component({
  selector: 'app-alert-filter',
  templateUrl: './alert-filter.component.html',
  styleUrls: ['./alert-filter.component.css']
})
export class AlertFilterComponent implements OnInit, OnChanges {

  @Input()
  public alerts: Alert[];

  @Input()
  public key;

  @Output()
  public addFilter = new EventEmitter<any>();

  public counts: {name: string, count: number}[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (this.alerts) {
      const groups = groupBy(this.alerts, this.key);
      this.counts =
        Object.keys(groups)
          .map((key: string) => ({name: key, count: groups[key].length}))
            .filter(item => item.count > 0);
    }
  }

  onFilter(value) {
    const filterCallback = (alert: Alert) => alert[this.key] === value;
    this.addFilter.emit(filterCallback);
  }
}
