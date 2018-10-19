import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatLabel'
})
export class FormatLabelPipe implements PipeTransform {

  transform(value: string, args?: any): any {

    value = value.replace('_', ' ');
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
