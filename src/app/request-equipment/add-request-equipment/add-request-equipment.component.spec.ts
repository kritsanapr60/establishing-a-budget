import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestEquipmentComponent } from './add-request-equipment.component';

describe('AddRequestEquipmentComponent', () => {
  let component: AddRequestEquipmentComponent;
  let fixture: ComponentFixture<AddRequestEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRequestEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequestEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
