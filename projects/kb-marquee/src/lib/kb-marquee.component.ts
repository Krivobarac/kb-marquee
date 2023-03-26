import { AfterViewInit, Component, ElementRef, Input, ViewChild, HostListener, HostBinding, OnInit, ChangeDetectorRef } from '@angular/core';
import { style, animate, keyframes, AnimationBuilder, AnimationFactory } from '@angular/animations';

@Component({
  selector: 'kb-marquee',
  templateUrl: './kb-marque.component.html',
  styleUrls: ['./kb-marquee.component.scss']
})
export class KbMarqueeComponent implements OnInit, AfterViewInit {
  @ViewChild('marqueeGroup1') marqueeGroup1?: ElementRef;
  @ViewChild('marqueeGroup2') marqueeGroup2?: ElementRef;

  @Input() duration: number = 5;
  @Input() gap: number = 0;
  @Input() pause: boolean = false;
  @Input() direction: `to-left` | `to-right` = 'to-left';
  @Input() animationTiming: `linear` | `ease` | 'ease-in' | 'ease-out' | 'ease-in-out' = 'linear';

  animPlayer1: any;
  animPlayer2: any;
  isSpaceAround = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private animationBuilder: AnimationBuilder
  ) {}

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

    this.setAnimationPlayers();
    this.playAnimations();

    this.animPlayer2.onDone(() => {
      this.restartAnimations();
    });

    if (this.pause) {
      this.onHoverStopAnimations();
    }
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

  private get animationFactory(): AnimationFactory {
    return this.animationBuilder.build([
      animate(  `${this.duration}s ${this.animationTiming}`, keyframes([
        style({ transform: `translateX(${this.distanceStartPosition})` }),
        style({ transform: `translateX(${this.distance})` })
      ]))
    ]);
  }

  private setAnimationPlayers() {
    this.animPlayer1 = this.animationFactory.create(this.marqueeGroup1?.nativeElement);
    this.animPlayer2 = this.animationFactory.create(this.marqueeGroup2?.nativeElement);
  }

  private onHoverStopAnimations() {
    this.marqueeGroup1?.nativeElement.addEventListener('mouseover', this.stopAnimations.bind(this));
    this.marqueeGroup1?.nativeElement.addEventListener('touchstart', this.stopAnimations.bind(this));
    this.marqueeGroup1?.nativeElement.addEventListener('mouseout', this.playAnimations.bind(this));
    this.marqueeGroup1?.nativeElement.addEventListener('touchend', this.playAnimations.bind(this));
  }

  playAnimations() {
    this.animPlayer1.play();
    this.animPlayer2.play();
  }

  stopAnimations() {
    this.animPlayer1.pause();
    this.animPlayer2.pause();
  }

  restartAnimations() {
    this.animPlayer1.restart();
    this.animPlayer2.restart();
  }
}
