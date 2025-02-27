export interface Expense {
  _id?: string;
  expenseType: string; //id of expenseType
  employee: string;
  department: string;
  sum: number;
  date: Date;
}
