import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsPanelComponent } from './budgets-panel.component';

describe('BudgetsPanelComponent', () => {
  let component: BudgetsPanelComponent;
  let fixture: ComponentFixture<BudgetsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
