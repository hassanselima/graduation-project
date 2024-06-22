import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPG1Component } from './add-pg1.component';

describe('AddPG1Component', () => {
  let component: AddPG1Component;
  let fixture: ComponentFixture<AddPG1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPG1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPG1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
