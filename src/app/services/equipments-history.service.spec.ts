import { TestBed } from '@angular/core/testing';

import { EquipmentsHistoryService } from './equipments-history.service';

describe('EquipmentsHistoryService', () => {
  let service: EquipmentsHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentsHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
