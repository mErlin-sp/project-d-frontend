import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityHistoryComponent } from './availability-history.component';

describe('AvailabilityHistoryComponent', () => {
  let component: AvailabilityHistoryComponent;
  let fixture: ComponentFixture<AvailabilityHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilityHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailabilityHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
