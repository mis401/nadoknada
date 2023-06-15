import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovKomentarDialogComponent } from './nov-komentar-dialog.component';

describe('NovKomentarDialogComponent', () => {
  let component: NovKomentarDialogComponent;
  let fixture: ComponentFixture<NovKomentarDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovKomentarDialogComponent]
    });
    fixture = TestBed.createComponent(NovKomentarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
