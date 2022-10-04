import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Survey } from 'src/app/survey';
import { FormControl } from '@angular/forms';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'; 


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit, OnChanges {
  faCheck = faCheckCircle;
  selectedDate = new FormControl();
  @Input() surveyItem: Survey;
  surveyPeriods:any[];
  surveyPeriodLength;
  dates:Array<{start_date:string, end_date:string}>

  constructor() { }

  ngOnChanges(){
    
  }
  ngOnInit(): void {
    this.surveyPeriods = JSON.parse(this.surveyItem.SurveyPeriods);
  }


}
