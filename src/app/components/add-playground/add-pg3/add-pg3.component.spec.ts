import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPG3Component } from './add-pg3.component';

describe('AddPG3Component', () => {
  let component: AddPG3Component;
  let fixture: ComponentFixture<AddPG3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPG3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPG3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
