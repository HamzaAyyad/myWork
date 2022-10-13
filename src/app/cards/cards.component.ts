import { Component, OnInit, Input } from '@angular/core';
import { formatDate } from "@angular/common";
import { Survey } from '../survey';
import { SurveysService } from '../services/surveys.service';
import { DashboardService } from '../services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  surveys: Survey[];
  filterdSurveys: Survey[];
  tempSurveys: Survey[];
  cardsSubscription: Subscription;
  idSubscription: Subscription;
  id: number = 0;
  tabName: string = 'Published'
  tabNameSubscription: Subscription
  searchName: string = ''
  searchNameSubscription: Subscription
  @Input() viewTypes: boolean;

  constructor(private surveyService: SurveysService, private dashboardService: DashboardService) {

    this.surveyService.getSurvery().subscribe((surveys) => {
      this.surveys = surveys
      this.surveys.forEach(item => {
        item.SurveyPeriods = JSON.parse(item.SurveyPeriods)
        item.SurveyPeriods.forEach(period => {
          period.START_DATE = formatDate(period.START_DATE,'MM/dd/yyyy','en-US')
          period.END_DATE = formatDate(period.END_DATE,'MM/dd/yyyy','en-US')
        })
      })
      
      this.tempSurveys = this.surveys
      this.filterdSurveys = this.tempSurveys.filter(survey => {
        return this.filterSurveys(survey)
      })
      console.log(this.filterdSurveys)
    })
    
  }
  
  ngOnInit(): void {
    
    this.idSubscription = this.dashboardService.updateId().subscribe(index => this.id = index)
    this.cardsSubscription = this.dashboardService
    .onSurveyNameChange()
    .subscribe(value => this.surveys[this.surveys
      .findIndex((name) => name.SRV_ID === this.id)].SurveyName = value)

      this.tabNameSubscription = this.dashboardService.onTabChange().subscribe(value => {this.tabName = value;
        this.filterdSurveys = this.tempSurveys.filter(survey => {
          return this.filterSurveys(survey)
        })
        console.log(this.filterdSurveys)
      })

      this.searchNameSubscription = this.dashboardService.onSearchName().subscribe(value => {this.searchName = value;
        this.filterdSurveys = this.tempSurveys.filter(survey => {
          return this.filterSurveys(survey)
        })
        console.log(this.filterdSurveys)
      })
      

    }
    
  filterSurveys(survey:Survey){
    if (this.tabName === 'All Surveys') {
      console.log('all serveys')
      return this.filterByName(survey)
      // return 
    } else {
      let surveyStatus = survey.SURVEY_STATUS_EN
      switch(this.tabName){
        case surveyStatus : return this.filterByName(survey)
        case surveyStatus : return this.filterByName(survey)
        case surveyStatus : return this.filterByName(survey)
      }
       return
    }
  }

  filterByName(survey: Survey){
    if (this.searchName === '') {
      return survey
    } else {
      if (survey.SurveyName.includes(this.searchName)) {
        return survey
      }
    }
  }

}
