import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthNumToString'
})
export class MonthNumToStringPipe implements PipeTransform {

  transform(value: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return months[value - 1] || 'Invalid month';
  }

}
