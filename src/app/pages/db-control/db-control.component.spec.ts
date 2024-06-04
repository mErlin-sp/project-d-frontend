import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbControlComponent } from './db-control.component';

describe('DbControlComponent', () => {
  let component: DbControlComponent;
  let fixture: ComponentFixture<DbControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DbControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
