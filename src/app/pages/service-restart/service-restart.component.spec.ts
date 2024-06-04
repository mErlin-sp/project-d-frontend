import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRestartComponent } from './service-restart.component';

describe('ServiceRestartComponent', () => {
  let component: ServiceRestartComponent;
  let fixture: ComponentFixture<ServiceRestartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRestartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceRestartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
