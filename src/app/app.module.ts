import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import { PaginationModule } from './components/pagination/pagination.module';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PaginationModule,
    NgChartsModule,
    SharedModule
  ],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent],
  entryComponents: [
  ]
})
export class AppModule { }
