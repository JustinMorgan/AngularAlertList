import { Component, OnInit } from '@angular/core';
import { AlertsService } from './../../services/alerts/alerts.service';
import { Alert } from './../../models/alert';

type Filter = (alert: Alert) => boolean;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public alerts: Alert[];
  public filteredAlerts: Alert[];
  public selectedAlert: Alert;
  public linkFilters = new Map<string, Filter>();
  public searchFilter: (alert: Alert) => boolean = (alert: Alert) => true;

  constructor(private alertsService: AlertsService) { }

  ngOnInit() {
    this.alertsService.getAlerts().subscribe(alerts => this.filteredAlerts = this.alerts = alerts);
  }

  showDetail(alert) {
    this.selectedAlert = alert;
  }

  search(filterCallback) {
    this.searchFilter = filterCallback;
    this.filter();
  }

  addFilter({filterCallback, key}) {
    this.linkFilters.set(key, filterCallback);
    this.filter();
  }

  clearFilters() {
    this.linkFilters.clear();
    this.filter();
  }

  filter() {
    this.filteredAlerts = this.alerts;
    this.filteredAlerts = this.filteredAlerts.filter(this.searchFilter);
    this.linkFilters.forEach(filter => this.filteredAlerts = this.filteredAlerts.filter(filter));
  }
}
