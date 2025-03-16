import { Injectable } from '@angular/core';
import { Permission } from '../models/permissions.model';

@Injectable()
export class PermissionsService {
  private permissions: Permission[] = []; 

  constructor() {
    this.permissions = [
      Permission.UserCreate,
      Permission.UserRead,
      Permission.UserUpdate,
      Permission.UserDeleteAdmin,
      Permission.RoleCreate,
      Permission.RoleRead,
      Permission.RoleUpdate,
      Permission.RoleDelete,
      Permission.RoleDeleteAdmin,
      Permission.PermissionCreate,
      Permission.PermissionRead,
      Permission.PermissionUpdate,
      Permission.PermissionDelete,
      Permission.EmployeeCreate,
      Permission.EmployeeRead,
      Permission.EmployeeDelete,
      Permission.EmployeeDeleteDirector,
      Permission.DepartmentCreate,
      Permission.DepartmentRead,
      Permission.DepartmentUpdate,
      Permission.DepartmentDelete,
      Permission.PositionCreate,
      Permission.PositionRead,
      Permission.PositionUpdate,
      Permission.PositionDeletes
    ];
  }
}
