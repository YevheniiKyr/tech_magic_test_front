import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from '../../../services/user.service';
import {DepartmentService} from '../../../services/department.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-panel',
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './users-panel.component.html',
  styleUrl: './users-panel.component.css'
})

export class UsersPanelComponent implements OnInit {
  departments: any[] = [];
  users: any[] = [];
  filteredUsers: any[] = [];
  editingUser: any = null;
  selectedDepartment: string = '';
  selectedUserId: string = '';
  selectedUser:any = null;
  editForm!: FormGroup;


   constructor(
    private fb: FormBuilder,
    private router: Router,
    private departmentService: DepartmentService,
    private userService: UserService,
  ) {

  }


  ngOnInit(): void {
    this.loadDepartments();
    this.loadUsers();

    this.editForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      department: [''],
      role: ['']
    });
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data
    });
  }

  editUser(user: any) {
    this.editingUser = user;
    this.editForm.patchValue({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      department: user.department.name,
      role: user.role,
    });
  }


  saveUser() {
    if (this.editingUser) {
      const updatedUser = {...this.editingUser, ...this.editForm.value};
      this.userService.updateUser(updatedUser).subscribe(() => {
        this.loadUsers();
        this.editingUser = null;
      });
    }
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  filterUsers() {
    let filteredUsers = this.users;
    if (this.selectedUserId !== '' || this.selectedDepartment !== '') {
      // if (this.selectedUser !== '') {
      //   this.selectedUser = this.users.filter(user => user._id === this.selectedUser);
      // }
      if (this.selectedDepartment !== '') {
        filteredUsers = filteredUsers.filter(user => user.department._id === this.selectedDepartment);
      }
      console.log('Filtered expenses', filteredUsers);
      this.filteredUsers = filteredUsers;
      return;
    }
  }

  resetFilters() {
    this.selectedDepartment = '';
    this.selectedUserId = '';
    this.filteredUsers = this.users;
  }

  setSelectedUser() {
    this.selectedUser = this.users.filter(user => user._id === this.selectedUserId)[0];
    console.log("selected user", this.selectedUser);
  }
}
