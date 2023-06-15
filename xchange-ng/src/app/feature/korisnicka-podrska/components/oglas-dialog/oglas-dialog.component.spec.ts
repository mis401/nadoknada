import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OglasDialogComponent } from './oglas-dialog.component';

describe('OglasDialogComponent', () => {
  let component: OglasDialogComponent;
  let fixture: ComponentFixture<OglasDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OglasDialogComponent]
    });
    fixture = TestBed.createComponent(OglasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
