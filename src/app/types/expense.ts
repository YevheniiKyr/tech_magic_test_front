export interface Expense {
  id?: string;
  expenseType: string; //id of expenseType
  employee: string;
  department: string;
  sum: number;
  date: Date;
}
