import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPG4Component } from './add-pg4.component';

describe('AddPG4Component', () => {
  let component: AddPG4Component;
  let fixture: ComponentFixture<AddPG4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPG4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPG4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
