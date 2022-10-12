import { Component, OnInit, Input } from '@angular/core';
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
  cardsSubscription: Subscription;
  idSubscription: Subscription;
  id: number = 0;
  @Input() viewTypes: string;

  constructor(private surveyService: SurveysService, private dashboardService: DashboardService) {

    this.surveyService.getSurvery().subscribe((surveys) => {
      this.surveys = surveys
      this.surveys.forEach(item => {
        item.SurveyPeriods = JSON.parse(item.SurveyPeriods)
      })
    })

  }

  ngOnInit(): void {

    this.idSubscription = this.dashboardService.updateId().subscribe(index => this.id = index)
    this.cardsSubscription = this.dashboardService
      .onSurveyNameChange()
      .subscribe(value => this.surveys[this.surveys
        .findIndex((name) => name.SRV_ID === this.id)].SurveyName = value)
  }

}
