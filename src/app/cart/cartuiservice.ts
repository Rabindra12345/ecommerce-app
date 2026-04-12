import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cartuiservice {

  private fly$ = new Subject<any>();
  flyAnimation$ = this.fly$.asObservable();

  trigger(data: any) {
    this.fly$.next(data);
  }

  
  
}
