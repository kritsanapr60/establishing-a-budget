import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllprojectComponent } from './allproject.component';

describe('AllprojectComponent', () => {
  let component: AllprojectComponent;
  let fixture: ComponentFixture<AllprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
