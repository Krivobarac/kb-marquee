import { AfterViewInit, Component, ElementRef, Input, ViewChild, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'kb-marquee',
  templateUrl: './kb-marque.component.html',
  styleUrls: ['./kb-marquee.component.scss']
})
export class KbMarqueeComponent implements AfterViewInit {
  @ViewChild('marquee') marquee?: ElementRef;
  @ViewChild('marqueeGroup1') marqueeGroup1?: ElementRef;
  @ViewChild('marqueeGroup2') marqueeGroup2?: ElementRef;

  @Input() duration: number = 5;
  @Input() gap: number = 0;
  @Input() pause: boolean = false;
  @Input() direction: `to-left` | `to-right` = 'to-left';

  marqueeElement?: HTMLElement;
  marqueeGroupElement1?: HTMLElement;
  marqueeGroupElement2?: HTMLElement;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setStyle();
  }

  ngAfterViewInit(): void {
    this.cloneMarqueeGroup();
    this.setStyle();
  }

  cloneMarqueeGroup() {
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

  private setStyle() {
    if (this.marqueeElement && this.marqueeGroupElement1 && this.marqueeGroupElement2) {
      if (this.marqueeElement.offsetWidth > this.marqueeGroupElement1.offsetWidth) {
        this.marqueeGroupElement1.style.minWidth = '100%';
        this.marqueeGroupElement1.style.justifyContent = 'space-around';
        this.marqueeGroupElement2.style.minWidth = '100%';
        this.marqueeGroupElement2.style.justifyContent = 'space-around';
      } else {
        this.marqueeGroupElement1.style.minWidth = 'unset';
        this.marqueeGroupElement1.style.justifyContent = 'unset';
        this.marqueeGroupElement2.style.minWidth = 'unset';
        this.marqueeGroupElement2.style.justifyContent = 'unset';
      }
      
      this.setMarqueAnimation();

      if (this.pause) {
        this.marqueeElement.addEventListener('mouseover', () => this.pauseAnimation(true));
        this.marqueeElement.addEventListener('mouseout', () => this.pauseAnimation(false));
        this.marqueeElement.addEventListener('touchstart', () => this.pauseAnimation(true));
        this.marqueeElement.addEventListener('touchend', () => this.pauseAnimation(false));
      }
    }
  }

  setMarqueAnimation() {
    if (this.marqueeGroupElement1 && this.marqueeGroupElement2) {
      var keyframes = `
      @keyframes looping {
        0% {
          transform: translateX(0);
        }
      
        100% {
          transform: translateX(calc(-100% - ${this.gap}px));
        }
      }`;
      document.styleSheets[0].insertRule(keyframes, 0);

      this.marqueeGroupElement1.style.animation = `looping ${this.duration}s linear infinite`;
      this.marqueeGroupElement2.style.animation = `looping ${this.duration}s linear infinite`;
      
      if (this.direction === 'to-right') {
        this.marqueeGroupElement1.style.animationDirection = 'reverse';
        this.marqueeGroupElement2.style.animationDirection = 'reverse';
      }
    }
  }

  pauseAnimation(paused: boolean) {
    if (this.marqueeGroupElement1 && this.marqueeGroupElement2) {
      this.marqueeGroupElement1.style.animationPlayState = paused ? 'paused' : 'running';
      this.marqueeGroupElement2.style.animationPlayState = paused ? 'paused' : 'running';
    }
  }
}
