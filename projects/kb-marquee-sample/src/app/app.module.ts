import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KbMarqueeModule } from 'kb-marquee';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KbMarqueeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
