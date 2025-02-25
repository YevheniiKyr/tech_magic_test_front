import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../services/department.service';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-departments-panel',
  templateUrl: './departments-panel.component.html',
  imports: [FormsModule, NgForOf, NgIf],
  styleUrls: ['./departments-panel.component.css']
})
export class DepartmentsPanelComponent implements OnInit {
  departments: any[] = [];
  newDepartment = { name: '', employeeCount: 0 };
  editingDepartment: any = null;

  constructor(
    private departmentsService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentsService.getDepartments().subscribe((data) => {
      this.departments = data;
    });
  }

  createDepartment() {
    if (!this.newDepartment.name || !this.newDepartment.employeeCount) return;

    this.departmentsService.createDepartment(this.newDepartment).subscribe(() => {
      this.newDepartment = { name: '', employeeCount: 0 };
      this.loadDepartments();
    });
  }

  startEditing(department: any) {
    this.editingDepartment = { ...department };
  }

  cancelEditing() {
    this.editingDepartment = null;
  }

  saveEdit() {
    if (!this.editingDepartment.name || !this.editingDepartment.employeeCount) return;

    this.departmentsService.updateDepartment(this.editingDepartment).subscribe(() => {
      this.editingDepartment = null;
      this.loadDepartments();
    });
  }

  deleteDepartment(id: any) {
    if (confirm("Are you sure you want to delete this department?")) {
      this.departmentsService.deleteDepartment(id).subscribe(() => {
        this.loadDepartments();
      });
    }
  }

  navToBudgets(id: any){
    console.log('id', id)
    return this.router.navigate([`/departments-panel/department/${id}/budgets`]);

  }
}
