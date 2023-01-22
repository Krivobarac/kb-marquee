import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KbMarqueeComponent } from './kb-marquee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    KbMarqueeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    KbMarqueeComponent
  ]
})
export class KbMarqueeModule { }
