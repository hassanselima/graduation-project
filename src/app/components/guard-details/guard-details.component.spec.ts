import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardDetailsComponent } from './guard-details.component';

describe('GuardDetailsComponent', () => {
  let component: GuardDetailsComponent;
  let fixture: ComponentFixture<GuardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuardDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
