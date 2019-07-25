import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterService } from 'src/app/services/filters/filters.service';
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
export class AlertFilterComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public alerts: Alert[];
  @Input() public key;
  // @Output() public setFilter = new EventEmitter<any>();

  public counts: ({value: any, count: number})[];
  // public hasFilter: boolean;
  // public hasFilter$: Observable<boolean>;
  public filter$: Observable<any>;

  private ngUnsubscribe = new Subject<void>();

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    // this.filterService.filtersChanged
    //     .pipe(takeUntil(this.ngUnsubscribe))
    //     .subscribe((filterMap) => {
    //       this.hasFilter = filterMap.has(this.key);
    //     });
    // this.hasFilter$ = this.filterService.filtersChanged
    //                       .pipe( map(filters => filters.has(this.key)) );
    this.filter$ = this.filterService
                       .filters$
                       .pipe(map(filters => filters.get(this.key)));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.alerts.currentValue) {
      this.counts = this.alerts
        .map(alert => alert[this.key])
        .reduce(createReducer(), []);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onFilter(value) {
    const filterCallback = (alert: Alert) => alert[this.key] === value;
    // this.setFilter.emit({filterCallback, key: this.key});

    this.filterService.setFilter(this.key, filterCallback);
  }

  clear() {
    // this.setFilter.emit({key: this.key});
    this.filterService.setFilter(this.key);
  }
}
