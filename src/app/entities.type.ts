export interface Position {
  id: number,
  name: string
}

export interface Department {
  id: number;
  name: String;
}

export interface Subordinate {
  id: number;
  name: string;
  surname: string;
  managerId: string;
  managerName: string;
  positionId: number;
  positionName: string;
  birthDate: Date;
}

export interface Manager {
  id: number;
  name: string;
  surname: string;
  managerId: number;
  managerName: string;
  positionId: number;
  positionName: string;
  level: number;
  birthDate: Date;
}

export interface Employee {
  id: number;
  name: string;
  surname: string;
  positionId: number;
  positionName: string;
  birthDate: Date;
}

export interface User {
  id: number, 
  name: string,
  surname: string,
  email: string,
  accessToken: string
}