import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingPlatformsComponent } from './trading-platforms.component';

describe('TradingPlatformsComponent', () => {
  let component: TradingPlatformsComponent;
  let fixture: ComponentFixture<TradingPlatformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradingPlatformsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradingPlatformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
