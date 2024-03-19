import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinToUsComponent } from './join-to-us.component';

describe('JoinToUsComponent', () => {
  let component: JoinToUsComponent;
  let fixture: ComponentFixture<JoinToUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinToUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinToUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
