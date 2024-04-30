import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkhoursComponent } from './workhours.component';

describe('WorkhoursComponent', () => {
  let component: WorkhoursComponent;
  let fixture: ComponentFixture<WorkhoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkhoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkhoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
