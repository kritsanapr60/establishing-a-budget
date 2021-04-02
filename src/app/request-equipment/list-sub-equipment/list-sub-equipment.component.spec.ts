import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubEquipmentComponent } from './list-sub-equipment.component';

describe('ListSubEquipmentComponent', () => {
  let component: ListSubEquipmentComponent;
  let fixture: ComponentFixture<ListSubEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
