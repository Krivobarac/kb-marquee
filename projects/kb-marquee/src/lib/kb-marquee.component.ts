import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'kb-marquee',
  templateUrl: './kb-marque.component.html',
  styleUrls: ['./kb-marquee.component.scss']
})
export class KbMarqueeComponent implements AfterViewInit {
  @ViewChild('marqueeGroup1') marqueeGroup1?: ElementRef;
  @ViewChild('marquee') marquee?: ElementRef;
  
  @Input() type: 'single' | 'multi' = 'single';

  ngAfterViewInit(): void {
    if ( this.marqueeGroup1 && this.marquee ) {
      const marqueeGroupEl1 = (this.marqueeGroup1?.nativeElement as HTMLElement);
      const marquee = (this.marquee?.nativeElement as HTMLElement);

      if (marqueeGroupEl1.hasChildNodes()) {
        const clonedElement: Node = this.marqueeGroup1 && (this.marqueeGroup1.nativeElement as HTMLElement).cloneNode(true);
        marquee.append(clonedElement)
      }
    }
  }
}
