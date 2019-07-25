import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Filter } from 'src/app/models/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public filters$ = new BehaviorSubject<Map<string, Filter>>(new Map());

  private map = new Map<string, Filter>();

  constructor() { }

  getFilters() {
    return Array.from(this.map.values());
  }

  getFilter(key) {
    return this.map.get(key);
  }

  setFilter(key, filterCallback?) {
    if (filterCallback) {
      this.map.set(key, filterCallback);
    } else {
      this.map.delete(key);
    }

    this.onFilterChange();
  }

  clearFilters() {
    this.map.clear();

    this.onFilterChange();
  }

  private onFilterChange() {
    this.filters$.next(new Map(this.map));
  }
}
