import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingQueriesComponent } from './tracking-queries.component';

describe('TrackingQueriesComponent', () => {
  let component: TrackingQueriesComponent;
  let fixture: ComponentFixture<TrackingQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingQueriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackingQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
