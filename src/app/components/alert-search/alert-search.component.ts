import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filters/filters.service';
import { Alert } from './../../models/alert';

const keys = ['AlertId', 'AlertTime', 'Severity', 'ClientIP', 'ServerIP', 'Protocol', 'ClientCountry'];

@Component({
  selector: 'app-alert-search',
  templateUrl: './alert-search.component.html',
  styleUrls: ['./alert-search.component.css']
})
export class AlertSearchComponent implements OnInit {

  // @Output() search = new EventEmitter<any>();

  public searchString = '';

  constructor(private filterService: FilterService) { }

  ngOnInit() {
  }

  onModelChange() {
    // const searchString = (this.searchString + '').toLowerCase();
    // const filter = (alert: Alert) => Object.values(alert).some(value => (value + '').toLowerCase().includes(searchString));
    // this.search.emit(filter);

    const lower = str => (str + '').toLowerCase();

    const searchString = lower(this.searchString + '');
    const filter = searchString
                 ? (alert: Alert) => Object.values(alert)
                                           .some(value => lower(value).includes(searchString))
                 : undefined;

    this.filterService.setFilter('search-bar', filter);
  }
}
