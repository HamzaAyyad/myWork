import { Component, OnInit } from '@angular/core';
import { Survey } from '../survey';
import { SurveysService } from '../services/surveys.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  surveys: Survey;

  constructor(private surveyService: SurveysService) { }

  ngOnInit(): void {
      this.surveyService.getSurvery().subscribe((surveys) => this.surveys = surveys[0])
  }

  outputSurvey(){
    console.log (this.surveys)
  }

}
