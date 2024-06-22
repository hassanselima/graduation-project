import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPG2Component } from './add-pg2.component';

describe('AddPG2Component', () => {
  let component: AddPG2Component;
  let fixture: ComponentFixture<AddPG2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPG2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPG2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
