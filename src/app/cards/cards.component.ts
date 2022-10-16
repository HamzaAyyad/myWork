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
  date: string[] = []
  DateSub: Subscription;
  @Input() viewTypes: boolean;

  constructor(private surveyService: SurveysService, private dashboardService: DashboardService) {

    this.surveyService.getSurvery().subscribe((surveys) => {
      this.surveys = surveys
      this.surveys.forEach(item => {
        item.SurveyPeriods = JSON.parse(item.SurveyPeriods)
        item.SurveyPeriods.forEach(period => {
          period.START_DATE = formatDate(period.START_DATE, 'MM/dd/yyyy', 'en-US')
          period.END_DATE = formatDate(period.END_DATE, 'MM/dd/yyyy', 'en-US')
        })
      })

      this.tempSurveys = this.surveys
      this.filterdSurveys = this.tempSurveys.filter(survey => {
        return this.surveyFilter(survey)
      })
    })

  }

  ngOnInit(): void {

    this.idSubscription = this.dashboardService.updateId().subscribe(index => this.id = index)
    this.cardsSubscription = this.dashboardService
      .onSurveyNameChange()
      .subscribe(value => this.surveys[this.surveys
        .findIndex((name) => name.SRV_ID === this.id)].SurveyName = value)

    this.tabNameSubscription = this.dashboardService.onTabChange().subscribe(value => {
      this.tabName = value;
      this.filterdSurveys = this.tempSurveys.filter(survey => {
        return this.surveyFilter(survey)
      })
    })

    this.searchNameSubscription = this.dashboardService.onSearchName().subscribe(value => {
      this.searchName = value;
      this.filterdSurveys = this.tempSurveys.filter(survey => {
        return this.surveyFilter(survey)
      })
    })

    this.DateSub = this.dashboardService.onDateChange().subscribe(value => {
      this.date = value;
      this.filterdSurveys = this.tempSurveys.filter(survey => {
        return this.surveyFilter(survey)
      })
    })


  }

  surveyFilter(survey: Survey) {
    if (this.tabName === 'All Surveys') {
      console.log('all serveys')
      return this.filterByName(survey)
    } else {
      let surveyStatus = survey.SURVEY_STATUS_EN
      switch (this.tabName) {
        case surveyStatus: return this.filterByName(survey)
        case surveyStatus: return this.filterByName(survey)
        case surveyStatus: return this.filterByName(survey)
      }
      return
    }
  }

  filterByName(survey: Survey) {
    if (this.searchName === '') {
      return this.filterByDate(survey)
    } else {
      if (survey.SurveyName.includes(this.searchName)) {
        return this.filterByDate(survey)
      }
    }
  }

  filterByDate(survey: Survey) {
    let dateFound = false;
    if (this.date.length === 0) {
      return survey
    } else {
      survey.SurveyPeriods.forEach(period => {
        if (period.START_DATE === this.date[0] && period.END_DATE === this.date[1]) {
          dateFound = true
        } else {
          dateFound = false;
        }
      })
      if (dateFound) {
        return survey
      }
    }
  }

}
