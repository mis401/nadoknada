import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijaviOglasDialogComponent } from './prijavi-oglas-dialog.component';

describe('PrijaviOglasDialogComponent', () => {
  let component: PrijaviOglasDialogComponent;
  let fixture: ComponentFixture<PrijaviOglasDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrijaviOglasDialogComponent]
    });
    fixture = TestBed.createComponent(PrijaviOglasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
