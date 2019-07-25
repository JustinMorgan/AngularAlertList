import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alert } from '../../models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private url = 'assets/alerts.json';
  private alerts: Alert[];

  constructor(private http: Http) {
  }

  getAlerts(): Observable<Alert[]> {
    return this.alerts
          ? of(this.alerts.slice())
          : this.http
                .get(this.url)
                .pipe(
                  map((response: Response) => this.alerts = response.json())
                );
  }
}
