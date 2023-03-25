import { AfterViewInit, Component, ElementRef, Input, ViewChild, HostListener, HostBinding, OnInit } from '@angular/core';
import { trigger, style, animate, keyframes, transition } from '@angular/animations';

@Component({
  selector: 'kb-marquee',
  templateUrl: './kb-marque.component.html',
  styleUrls: ['./kb-marquee.component.scss'],
  animations: [trigger('marqueeAnimation', [
    transition('* => *', [
      animate('{{ duration }}s {{ animationTiming }}', keyframes([
        style({ transform: 'translateX({{ distanceStartPosition }})' }),
        style({ transform: 'translateX({{ distance }})' })
      ]))
    ])
  ])]
})
export class KbMarqueeComponent implements OnInit, AfterViewInit {
  @ViewChild('marquee') marquee?: ElementRef;
  @ViewChild('marqueeGroup1') marqueeGroup1?: ElementRef;
  @ViewChild('marqueeGroup2') marqueeGroup2?: ElementRef;

  @Input() duration: number = 5;
  @Input() gap: number = 0;
  @Input() pause: boolean = false;
  @Input() direction: `to-left` | `to-right` = 'to-left';
  @Input() animationTiming: `linear` | `ease` | 'ease-in' | 'ease-out' | 'ease-in-out' = 'linear';

  animState = true;
  marqueeElement?: HTMLElement;
  marqueeGroupElement1?: HTMLElement;
  marqueeGroupElement2?: HTMLElement;

  @HostBinding('style.gap') protected hostGap?: string;

  @HostListener('window:resize', ['$event'])
  protected onResize() {
    // console.log(5555)
  }

  ngOnInit(): void {
    this.hostGap = this.gap + 'px';
  }

  ngAfterViewInit(): void {
    this.cloneMarqueeGroup();
  }

  protected cloneMarqueeGroup() {
    if (this.marqueeGroup1) {
      this.marqueeElement = (this.marquee?.nativeElement as HTMLElement);
      this.marqueeGroupElement1 = (this.marqueeGroup1?.nativeElement as HTMLElement);
      this.marqueeGroupElement2 = (this.marqueeGroup2?.nativeElement as HTMLElement);

      if (this.marqueeGroupElement1?.hasChildNodes()) {
        this.marqueeGroupElement1.childNodes.forEach(childNode => {
          this.marqueeGroup2?.nativeElement.append(childNode.cloneNode(true))
        })
      }
    }
  }

  protected get distanceStartPosition(): string {
    return this.direction === 'to-right' ? `calc(-100% - ${this.gap}px)` : `calc(0% + ${this.gap}px)`;
  }

  protected get distance(): string {
    return this.direction === 'to-right' ? '0' : '-100%';
  }
}
