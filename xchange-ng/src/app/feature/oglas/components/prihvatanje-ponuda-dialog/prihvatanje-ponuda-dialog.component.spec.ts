import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrihvatanjePonudaDialogComponent } from './prihvatanje-ponuda-dialog.component';

describe('PrihvatanjePonudaDialogComponent', () => {
  let component: PrihvatanjePonudaDialogComponent;
  let fixture: ComponentFixture<PrihvatanjePonudaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrihvatanjePonudaDialogComponent]
    });
    fixture = TestBed.createComponent(PrihvatanjePonudaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
