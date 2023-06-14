import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovOglasComponent } from './nov-oglas.component';

describe('NovOglasComponent', () => {
  let component: NovOglasComponent;
  let fixture: ComponentFixture<NovOglasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovOglasComponent]
    });
    fixture = TestBed.createComponent(NovOglasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
