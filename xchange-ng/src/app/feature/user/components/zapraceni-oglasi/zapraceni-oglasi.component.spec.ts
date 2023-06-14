import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapraceniOglasiComponent } from './zapraceni-oglasi.component';

describe('ZapraceniOglasiComponent', () => {
  let component: ZapraceniOglasiComponent;
  let fixture: ComponentFixture<ZapraceniOglasiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZapraceniOglasiComponent]
    });
    fixture = TestBed.createComponent(ZapraceniOglasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
