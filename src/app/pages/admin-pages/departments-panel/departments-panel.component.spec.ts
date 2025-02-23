import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsPanelComponent } from './departments-panel.component';

describe('DepartmentsPanelComponent', () => {
  let component: DepartmentsPanelComponent;
  let fixture: ComponentFixture<DepartmentsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
