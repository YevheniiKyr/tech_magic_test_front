import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentBudgetsComponent } from './department-budgets.component';

describe('DepartmentBudgetsComponent', () => {
  let component: DepartmentBudgetsComponent;
  let fixture: ComponentFixture<DepartmentBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentBudgetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
