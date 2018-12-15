import { Pipe, PipeTransform } from '@angular/core';
import { Group } from '../models/group.model';

@Pipe({
  name: 'groepFilter'
})
export class GroepFilterPipe implements PipeTransform {

  /**
   * Deze functie filtert de groepen die meegegeven worden in de array
   * De groepen worden gefilterd op de groepsnaam
   * @param groepen de array van groepen worden meegegeven
   * @param groepsnaam de groepsnaam waarop gefilterd moet worden wordt meegegeven
   */
  transform(groepen: Group[], groepsnaam: string): Group[] {
    if (!groepsnaam || groepsnaam.length === 0) {
      return groepen;
    }
    return groepen.filter(
      group => group.name && group.name.toLowerCase().includes(groepsnaam.toLowerCase())
    );

  }

}
