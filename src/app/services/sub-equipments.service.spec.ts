import { TestBed } from '@angular/core/testing';

import { SubEquipmentsService } from './sub-equipments.service';

describe('SubEquipmentsService', () => {
  let service: SubEquipmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubEquipmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
