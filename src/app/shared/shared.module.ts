import { NgModule } from '@angular/core';

import { MyFilterPipe } from './MyFilterPipe';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    MyFilterPipe
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    MyFilterPipe,
  ],
  providers: [ MyFilterPipe ],
})
export class SharedModule { }
