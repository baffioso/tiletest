import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName) {
    if (value.length === 0 || filterString === undefined ) {
      return value;
    }

    return value.filter(i => i[propName].toLowerCase().includes(filterString.toLowerCase()));

  }
}
