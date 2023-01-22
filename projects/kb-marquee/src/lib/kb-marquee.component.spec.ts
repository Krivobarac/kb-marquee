import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KbMarqueeComponent } from './kb-marquee.component';

describe('KbMarqueeComponent', () => {
  let component: KbMarqueeComponent;
  let fixture: ComponentFixture<KbMarqueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KbMarqueeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KbMarqueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
