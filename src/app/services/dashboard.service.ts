import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private showDashboardBtn: boolean = true;
  private dashboardBtnSubject = new Subject<boolean>();

  private surveyName: string;
  private surveyNameSubject = new Subject<string>();
  
  constructor() { }

  toggleDashboardbtn(value: boolean) {
    this.showDashboardBtn = value;
    this.dashboardBtnSubject.next(this.showDashboardBtn);
  }

  changeSurveyName(value: string){
    this.surveyName = value;
    this.surveyNameSubject.next(this.surveyName)
  }

  onSurveyNameChange(): Observable<string> {
    return this.surveyNameSubject.asObservable();
  }

  onDashBtnToggle(): Observable<boolean> {
    return this.dashboardBtnSubject.asObservable();
  }
}

