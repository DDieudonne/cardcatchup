import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsminutes',
  standalone: true
})
export class SecondsminutesPipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (value < 10 || (value < 70 && value > 59)) ?
      minutes + ':' + '0' + (value - minutes * 60) :
      value === 120 ?
      minutes + ':' + '00':
      minutes + ':' + (value - minutes * 60);
  }
}
