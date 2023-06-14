import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonudaDialogComponent } from './ponuda-dialog.component';

describe('PonudaDialogComponent', () => {
  let component: PonudaDialogComponent;
  let fixture: ComponentFixture<PonudaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PonudaDialogComponent]
    });
    fixture = TestBed.createComponent(PonudaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
