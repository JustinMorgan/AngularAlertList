import { Component, OnInit } from '@angular/core';
import { AlertsService } from './../../services/alerts/alerts.service';
import { Alert } from './../../models/alert';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public alerts: Alert[];
  public filteredAlerts: Alert[];
  public selectedAlert: Alert;
  public linkFilters: ((alert: Alert) => boolean)[] = [];
  public searchFilter: (alert: Alert) => boolean = (alert: Alert) => true;

  constructor(private alertsService: AlertsService) { }

  ngOnInit() {
    this.alertsService.getAlerts().subscribe(alerts => this.filteredAlerts = this.alerts = alerts);
  }

  showDetail(alert) {
    this.selectedAlert = alert;
  }

  addFilter(filterCallback) {
    this.linkFilters.push(filterCallback);
    this.filter();
  }

  search(filterCallback) {
    this.searchFilter = filterCallback;
    this.filter();
  }

  filter() {
    const composedFilter = (alert: Alert) =>
      this.linkFilters
        .concat(this.searchFilter)
        .every(filter => filter(alert));

    this.filteredAlerts = this.alerts.filter(composedFilter);
  }

  clearFilters() {
    this.linkFilters = [];
    this.filteredAlerts = this.alerts.filter(this.searchFilter);
  }
}
