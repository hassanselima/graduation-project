import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPlaygroundsComponent } from './dash-playgrounds.component';

describe('DashPlaygroundsComponent', () => {
  let component: DashPlaygroundsComponent;
  let fixture: ComponentFixture<DashPlaygroundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashPlaygroundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashPlaygroundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
