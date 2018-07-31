import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Alert } from '../../models/alert';

// Counts repetitions of values in an array
// [a, a, b, b, b, c] => [{value:a, count:2}, {value:b, count:3}, {value:c, count:1}]
const createReducer = () => {
  const lookup = {}; // for faster lookup of existing entries
  return (accumulator, value) => {
    if (!lookup[value]) {
      accumulator.push(lookup[value] = {value, count: 0});
    }
    lookup[value].count++;
    return accumulator;
  };
};

@Component({
  selector: 'app-alert-filter',
  templateUrl: './alert-filter.component.html',
  styleUrls: ['./alert-filter.component.css']
})
export class AlertFilterComponent implements OnInit, OnChanges {

  @Input() public alerts: Alert[];
  @Input() public key;
  @Output() public addFilter = new EventEmitter<any>();

  public counts: ({value: any, count: number})[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.alerts.currentValue) {
      this.counts = this.alerts
        .map(alert => alert[this.key])
        .reduce(createReducer(), []);
    }
  }

  onFilter(value) {
    const filterCallback = (alert: Alert) => alert[this.key] === value;
    this.addFilter.emit({filterCallback, key: this.key});
  }
}
