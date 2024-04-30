import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberoftenantComponent } from './numberoftenant.component';

describe('NumberoftenantComponent', () => {
  let component: NumberoftenantComponent;
  let fixture: ComponentFixture<NumberoftenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberoftenantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberoftenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
