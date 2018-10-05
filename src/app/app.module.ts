import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { ResultsComponent } from './results/results.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { MyFilterPipe } from './shared/MyFilterPipe';


@NgModule({
  declarations: [
    HeaderComponent,
    ResultsComponent,
    MyFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [HeaderComponent, ResultsComponent]
})
export class AppModule { }
