import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Alert } from '../../models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private url = 'assets/alerts.json';

  constructor(private http: Http) {}

  getAlerts () {
    return this.http.get(this.url)
      .pipe(map((response: Response) => response.json()));
  }
}
