import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheySaidComponent } from './they-said.component';

describe('TheySaidComponent', () => {
  let component: TheySaidComponent;
  let fixture: ComponentFixture<TheySaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TheySaidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheySaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
