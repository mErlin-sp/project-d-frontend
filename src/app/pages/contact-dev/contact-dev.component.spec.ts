import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDevComponent } from './contact-dev.component';

describe('ContactDevComponent', () => {
  let component: ContactDevComponent;
  let fixture: ComponentFixture<ContactDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDevComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
