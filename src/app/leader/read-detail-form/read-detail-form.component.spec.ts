import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDetailFormComponent } from './read-detail-form.component';

describe('ReadDetailFormComponent', () => {
  let component: ReadDetailFormComponent;
  let fixture: ComponentFixture<ReadDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
