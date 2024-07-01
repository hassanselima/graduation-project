import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPG6Component } from './add-pg6.component';

describe('AddPG6Component', () => {
  let component: AddPG6Component;
  let fixture: ComponentFixture<AddPG6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPG6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPG6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
