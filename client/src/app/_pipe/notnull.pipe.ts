import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../_models/message';

@Pipe({
  name: 'notnull'
})
export class NotnullPipe implements PipeTransform {

  transform(members:Message[]|null):Message[] {
    let ini:Message[]=[];
    if (members ===null)
      return ini;
    else
      return members;
  }

}
