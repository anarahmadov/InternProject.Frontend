export interface Position {
  id: number,
  name: string
}

export interface Department {
  id: number;
  name: String;
}

export interface Employee {
  id: number;
  name: string;
  surname: string;
  dateOfBirth: Date;
  email: string;
}

export interface User{
  id: number, 
  name: string,
  surname: string,
  email: string,
  accessToken: string
}
