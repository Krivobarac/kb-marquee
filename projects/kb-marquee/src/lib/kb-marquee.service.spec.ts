import { TestBed } from '@angular/core/testing';

import { KbMarqueeService } from './kb-marquee.service';

describe('KbMarqueeService', () => {
  let service: KbMarqueeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KbMarqueeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
