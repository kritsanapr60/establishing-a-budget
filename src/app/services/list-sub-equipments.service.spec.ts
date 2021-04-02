import { TestBed } from '@angular/core/testing';

import { ListSubEquipmentsService } from './list-sub-equipments.service';

describe('ListSubEquipmentsService', () => {
  let service: ListSubEquipmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListSubEquipmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
