import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPG5Component } from './add-pg5.component';

describe('AddPG5Component', () => {
  let component: AddPG5Component;
  let fixture: ComponentFixture<AddPG5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPG5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPG5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
