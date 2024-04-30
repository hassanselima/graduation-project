import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedPdayComponent } from './booked-pday.component';

describe('BookedPdayComponent', () => {
  let component: BookedPdayComponent;
  let fixture: ComponentFixture<BookedPdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookedPdayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookedPdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
