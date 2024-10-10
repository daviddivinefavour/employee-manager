export interface IEmployeeAttributes {
  id?: string;
  firstName: string;
  lastName: string;
  department: string;
  jobRole: string;
  birthday: Date;
  archivedAt?: Date;
  startDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IEmployee extends IEmployeeAttributes {
  userId: string;
}
