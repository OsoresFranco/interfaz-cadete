import { TestBed } from '@angular/core/testing';

import { TomarViajeService } from './tomar-viaje.service';

describe('TomarViajeService', () => {
  let service: TomarViajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TomarViajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
