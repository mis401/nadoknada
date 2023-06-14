import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OglasComponent } from './oglas.component';

describe('OglasComponent', () => {
  let component: OglasComponent;
  let fixture: ComponentFixture<OglasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OglasComponent]
    });
    fixture = TestBed.createComponent(OglasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
