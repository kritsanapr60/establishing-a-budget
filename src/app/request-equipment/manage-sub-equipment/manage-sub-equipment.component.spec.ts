import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubEquipmentComponent } from './manage-sub-equipment.component';

describe('ManageSubEquipmentComponent', () => {
  let component: ManageSubEquipmentComponent;
  let fixture: ComponentFixture<ManageSubEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSubEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
