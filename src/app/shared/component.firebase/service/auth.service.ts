import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private spinnerStatusSub$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  spinnerStstudObs$ : Observable<boolean> = this.spinnerStatusSub$.asObservable()

  setSpinnerStatus(flag : boolean){
    this.spinnerStatusSub$.next(flag)
  }
}
