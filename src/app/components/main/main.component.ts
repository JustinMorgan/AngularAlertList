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

  constructor(private alertsService: AlertsService) { }

  ngOnInit() {
    this.alertsService.getAlerts().subscribe(alerts => this.filteredAlerts = this.alerts = alerts);
  }

  showDetail(alert) {
    this.selectedAlert = alert;
  }

  addFilter({value, key}) {
    this.filteredAlerts = this.alerts.filter((alert: Alert) => alert[key] === value);
  }
}
