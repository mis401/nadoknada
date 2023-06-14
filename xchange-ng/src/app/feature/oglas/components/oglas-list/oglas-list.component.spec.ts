import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OglasListComponent } from './oglas-list.component';

describe('OglasListComponent', () => {
  let component: OglasListComponent;
  let fixture: ComponentFixture<OglasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OglasListComponent]
    });
    fixture = TestBed.createComponent(OglasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
