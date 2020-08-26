import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { ResultsComponent } from './results/results.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    HeaderComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    UserModule,
  ],
  providers: [],
  bootstrap: [HeaderComponent, ResultsComponent]
})
export class AppModule { }
