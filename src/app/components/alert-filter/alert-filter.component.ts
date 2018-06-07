import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Alert } from '../../models/alert';

function mapBy<K, T>(list: T[], propName: string): Map<K, T[]> {
  const map = new Map<K, T[]>();
  list.forEach(item => {
    const propValue = item[propName];
    if (!map.has(propValue)) {
      map.set(propValue, []);
    }
    const group = map.get(propValue);
    group.push(item);
  });
  return map;
}

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
      const groups = mapBy(this.alerts, this.key);
      this.counts =
        Array.from(groups.entries())
          .map(([value, alerts]) => ({value, count: alerts.length}));
    }
  }

  onFilter(value) {
    const filterCallback = (alert: Alert) => alert[this.key] === value;
    this.addFilter.emit({filterCallback, key: this.key});
  }
}
