import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestEquipmentComponent } from './request-equipment.component';

describe('RequestEquipmentComponent', () => {
  let component: RequestEquipmentComponent;
  let fixture: ComponentFixture<RequestEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
