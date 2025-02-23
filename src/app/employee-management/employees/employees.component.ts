import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class EmployeesComponent implements OnInit {
  employees = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Software Engineer',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      position: 'Project Manager',
    },
    {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      position: 'Data Scientist',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  editEmployee(employee: any) {
    console.log('Edit Employee', employee);
  }

  deleteEmployee(employee: any) {
    console.log('Delete Employee', employee);
  }
}
