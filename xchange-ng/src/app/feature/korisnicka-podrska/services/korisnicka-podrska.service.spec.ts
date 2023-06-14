import { TestBed } from '@angular/core/testing';

import { KorisnickaPodrskaService } from './korisnicka-podrska.service';

describe('KorisnickaPodrskaService', () => {
  let service: KorisnickaPodrskaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KorisnickaPodrskaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
