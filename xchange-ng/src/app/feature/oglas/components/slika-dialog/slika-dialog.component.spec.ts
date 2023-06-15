import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlikaDialogComponent } from './slika-dialog.component';

describe('SlikaDialogComponent', () => {
  let component: SlikaDialogComponent;
  let fixture: ComponentFixture<SlikaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlikaDialogComponent]
    });
    fixture = TestBed.createComponent(SlikaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
