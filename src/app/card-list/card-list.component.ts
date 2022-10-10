import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Survey } from '../survey';
import { SurveysService } from '../services/surveys.service';
import { CardItemComponent } from './card-item/card-item.component';
import { DashboardService } from '../services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  surveys: Survey;
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
    this.surveyService.getSurvery().subscribe((surveys) => this.surveys = surveys[0])
    
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
