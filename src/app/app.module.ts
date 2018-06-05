import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AlertsTableComponent } from './components/alerts-table/alerts-table.component';
import { AlertDetailsComponent } from './components/alert-details/alert-details.component';
import { AlertFiltersComponent } from './components/alert-filters/alert-filters.component';
import { AlertSearchComponent } from './components/alert-search/alert-search.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertsTableComponent,
    AlertDetailsComponent,
    AlertFiltersComponent,
    AlertSearchComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
