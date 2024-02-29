import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkscheduleComponent } from './workschedule.component';

describe('WorkscheduleComponent', () => {
  let component: WorkscheduleComponent;
  let fixture: ComponentFixture<WorkscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkscheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
