import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimehoursComponent } from './overtimehours.component';

describe('OvertimehoursComponent', () => {
  let component: OvertimehoursComponent;
  let fixture: ComponentFixture<OvertimehoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OvertimehoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OvertimehoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
