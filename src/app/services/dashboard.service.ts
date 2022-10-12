import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private showDashboardBtn: boolean = true;
  private dashboardBtnSubject = new Subject<boolean>();

  private id: number = 0;
  private idSubject = new BehaviorSubject<number>(0);

  private surveyName: string;
  private surveyNameSubject = new Subject<string>();

  constructor() {
  }

  toggleDashboardbtn(value: boolean, id: number) {
    this.showDashboardBtn = value;
    this.dashboardBtnSubject.next(this.showDashboardBtn);
    this.id = id;
  }

  changeSurveyName(value: string) {
    this.surveyName = value;
    this.idSubject.next(this.id)
    this.surveyNameSubject.next(this.surveyName)
  }

  onSurveyNameChange(): Observable<string> {
    return this.surveyNameSubject.asObservable();
  }

  updateId(): Observable<number> {
    console.log(this.id)
    return this.idSubject.asObservable();
  }

  onDashBtnToggle(): Observable<boolean> {
    return this.dashboardBtnSubject.asObservable();
  }
}

