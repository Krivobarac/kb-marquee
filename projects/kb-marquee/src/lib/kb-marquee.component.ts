import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'kb-marquee',
  templateUrl: './kb-marque.component.html',
  styleUrls: ['./kb-marquee.component.scss']
})
export class KbMarqueeComponent implements AfterViewInit {
  @ViewChild('marqueeGroup1') marqueeGroup1?: ElementRef;
  @ViewChild('marqueeGroup2') marqueeGroup2?: ElementRef;
  
  @Input() type: 'single' | 'multi' = 'single';

  ngAfterViewInit(): void {
    if ( this.marqueeGroup1 && this.marqueeGroup2 ) {
      const marqueeGroupEl1 = (this.marqueeGroup1?.nativeElement as HTMLElement);
      const marqueeGroupEl2 = (this.marqueeGroup2?.nativeElement as HTMLElement);

      if (marqueeGroupEl1.hasChildNodes()) {
        const clonedElements: Node[] = [this.marqueeGroup1 && (this.marqueeGroup1.nativeElement as HTMLElement).cloneNode(true)];
        marqueeGroupEl2.append(...clonedElements)
      }
    }
  }
}
