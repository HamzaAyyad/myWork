import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Survey } from '../../survey';
import { SurveysService } from '../../services/surveys.service';
import { CardItemComponent } from '../card-item/card-item.component';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.css']
})
export class CardListComponent implements OnInit {
  surveys: Survey[];
  selectedComponent;
  dashboardBtnStatus: boolean = true;
  dashboardSubscription: Subscription;
  surveyNameSubscription:Subscription;
  @ViewChildren(CardItemComponent) list: QueryList<CardItemComponent>;

  constructor(private surveyService: SurveysService, private dashboardService:DashboardService) { 
    
    this.dashboardSubscription = this.dashboardService
    .onDashBtnToggle()
    .subscribe(value => this.dashboardBtnStatus = value);
  }

  ngOnInit(): void {

    this.surveyService.getSurvery().subscribe((surveys) => {
      this.surveys = surveys
      this.surveys.forEach(item => {
        item.SurveyPeriods = JSON.parse(item.SurveyPeriods)
      })
    })
    
    this.surveyNameSubscription = this.dashboardService
    .onSurveyNameChange()
    .subscribe(value => this.selectedComponent.SurveyName = value)
  }

  cardSelected(event){
    if (event.value.selected) {
      this.dashboardService.toggleDashboardbtn(false)
    } else {
      this.dashboardService.toggleDashboardbtn(true)
    }
    this.selectedComponent = event.value.surveyItem
    this.list.forEach((item) => {
      item.unselect(Number(event.value.styleID))
    })
  }

}
