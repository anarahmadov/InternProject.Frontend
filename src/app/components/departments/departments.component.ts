import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DepartmentsComponent implements OnInit {
  departments = [
    { name: 'Engineering', manager: 'John Doe', location: 'Building A' },
    { name: 'HR', manager: 'Jane Smith', location: 'Building B' },
    { name: 'Marketing', manager: 'Bob Johnson', location: 'Building C' },
  ];

  constructor() {}

  ngOnInit(): void {}

  editDepartment(department: any) {
    console.log('Edit Department', department);
  }

  deleteDepartment(department: any) {
    console.log('Delete Department', department);
  }
}
