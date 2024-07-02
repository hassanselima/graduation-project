import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesP2Component } from './employees-p2.component';

describe('EmployeesP2Component', () => {
  let component: EmployeesP2Component;
  let fixture: ComponentFixture<EmployeesP2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesP2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
