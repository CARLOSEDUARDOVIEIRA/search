import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { ResultsComponent } from './results/results.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { MyFilterPipe } from './shared/MyFilterPipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    ResultsComponent,
    MyFilterPipe

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [HeaderComponent, ResultsComponent]
})
export class AppModule { }
