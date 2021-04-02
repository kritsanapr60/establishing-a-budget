import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadProjectDetailComponent } from './read-project-detail.component';

describe('ReadProjectDetailComponent', () => {
  let component: ReadProjectDetailComponent;
  let fixture: ComponentFixture<ReadProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadProjectDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
