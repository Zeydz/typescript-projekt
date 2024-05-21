import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallPlanComponent } from './overall-plan.component';

describe('OverallPlanComponent', () => {
  let component: OverallPlanComponent;
  let fixture: ComponentFixture<OverallPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverallPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
