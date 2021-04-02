import { TestBed } from '@angular/core/testing';

import { ExportsEquipmentService } from './exports-equipment.service';

describe('ExportsEquipmentService', () => {
  let service: ExportsEquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportsEquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
