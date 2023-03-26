import { AfterViewInit, Component, ElementRef, Input, ViewChild, HostListener, HostBinding, OnInit, ChangeDetectorRef } from '@angular/core';
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
  @ViewChild('marqueeGroup1') marqueeGroup1?: ElementRef;
  @ViewChild('marqueeGroup2') marqueeGroup2?: ElementRef;

  @Input() duration: number = 5;
  @Input() gap: number = 0;
  @Input() pause: boolean = false;
  @Input() direction: `to-left` | `to-right` = 'to-left';
  @Input() animationTiming: `linear` | `ease` | 'ease-in' | 'ease-out' | 'ease-in-out' = 'linear';

  animState = true;
  isSpaceAround = false;

  constructor(private changeDetector: ChangeDetectorRef) {}

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
    this.isSpaceAround = this.isBodyWiderThenMarqueGroup();
    this.changeDetector.detectChanges();
  }

  protected cloneMarqueeGroup() {
    if (this.marqueeGroup1) {
      if (this.marqueeGroup1.nativeElement.hasChildNodes()) {
        this.marqueeGroup1.nativeElement.childNodes.forEach((childNode: any) => {
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

  private isBodyWiderThenMarqueGroup(): boolean {
    return document.body.offsetWidth > this.marqueeGroup1?.nativeElement.offsetWidth;
  }
}
