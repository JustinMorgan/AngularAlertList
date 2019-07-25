import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertsService } from './../../services/alerts/alerts.service';
import { Alert } from './../../models/alert';
import { Subject, Observable, concat, BehaviorSubject } from 'rxjs';
import { FilterService } from 'src/app/services/filters/filters.service';
import { takeUntil, withLatestFrom, map } from 'rxjs/operators';
import { Filter } from 'src/app/models/filter';

// type Filter = (alert: Alert) => boolean;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  public selectedAlert: Alert;
  public filteredAlert$: Subject<Alert[]>;
  public filters$: Observable<Map<string, Filter>>;

  private ngUnsubscribe = new Subject<void>();

  constructor(private alertsService: AlertsService, private filterService: FilterService) { }

  async ngOnInit() {
    const alerts = await this.alertsService.getAlerts().toPromise();
    this.filteredAlert$ = new BehaviorSubject(alerts);

    this.filters$ = this.filterService.filters$.asObservable();

    this.filterService.filters$
        .pipe(
          map(filters => {
            let filteredAlerts = alerts.slice();

            filters.forEach(filter => {
              filteredAlerts = filteredAlerts.filter(filter);
            });

            return alerts;
          })
        )
        .subscribe(this.filteredAlert$);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  showDetail(alert) {
    this.selectedAlert = alert;
  }

  clearFilters() {
    this.filterService.clearFilters();
  }
}
