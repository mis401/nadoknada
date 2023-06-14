import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OglasPreviewComponent } from './oglas-preview.component';

describe('OglasPreviewComponent', () => {
  let component: OglasPreviewComponent;
  let fixture: ComponentFixture<OglasPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OglasPreviewComponent]
    });
    fixture = TestBed.createComponent(OglasPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
