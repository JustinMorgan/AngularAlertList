import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AlertsTableComponent } from './components/alerts-table/alerts-table.component';
import { AlertDetailsComponent } from './components/alert-details/alert-details.component';
import { AlertSearchComponent } from './components/alert-search/alert-search.component';
import { MainComponent } from './components/main/main.component';
import { AlertFilterComponent } from './components/alert-filter/alert-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertsTableComponent,
    AlertDetailsComponent,
    AlertSearchComponent,
    MainComponent,
    AlertFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
