import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../services/department.service';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-departments-panel',
  templateUrl: './departments-panel.component.html',
  imports: [FormsModule, NgForOf, NgIf],
  styleUrls: ['./departments-panel.component.css']
})
export class DepartmentsPanelComponent implements OnInit {
  departments: any[] = [];
  newDepartment = { name: '', description: '' };
  editingDepartment: any = null;

  constructor(private departmentsService: DepartmentService) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentsService.getDepartments().subscribe((data) => {
      this.departments = data;
    });
  }

  createDepartment() {
    if (!this.newDepartment.name || !this.newDepartment.description) return;

    this.departmentsService.createDepartment(this.newDepartment).subscribe(() => {
      this.newDepartment = { name: '', description: '' };
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
    if (!this.editingDepartment.name || !this.editingDepartment.description) return;

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
}
