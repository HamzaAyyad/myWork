import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../services/dashboard.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component';

@Component({
  selector: 'app-nav-elements',
  templateUrl: './nav-elements.component.html',
  styleUrls: ['./nav-elements.component.css']
})
export class NavElementsComponent implements OnInit {
  circleInfo = faInfoCircle;
  viewBtnState:boolean = false;
  dashboardSurveyName: string;
  dashboardBtnSubscripe: Subscription;
  surveyNameSubsciption: Subscription;
  dashboardBtnState: boolean = true;
  @Output() onToggleView = new EventEmitter();

  constructor(private dashboardService:DashboardService, public dashboardDialog:MatDialog) {
    this.dashboardBtnSubscripe = this.dashboardService
    .onDashBtnToggle()
    .subscribe(value => this.dashboardBtnState = value);

    this.surveyNameSubsciption = this.dashboardService
    .onSurveyNameChange()
    .subscribe(value => this.dashboardSurveyName = value)
   }

  ngOnInit(): void {
  }
  
  openDashboardDialog(){
    const dialogRef = this.dashboardDialog.open(DashboardDialogComponent, {
      width: '300px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`My name is ${result}`);
        this.dashboardService.changeSurveyName(String(result));
        console.log(this.dashboardSurveyName)

      } else {
        alert('No new name added')
      }
    });
  }

  onIconClick(view:string){
    this.viewBtnState = !this.viewBtnState;
    this.onToggleView.emit(view);
  }
}
