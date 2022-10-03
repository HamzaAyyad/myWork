import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'; 


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
  faCheck = faCheckCircle;
  selectedDate = new FormControl();
  SurveyPeriods1 = [{
    ID:1,
    START_DATE: '20/3/2021',
    END_DATE: '30/3/2021'
  }]
  SurveyPeriods2 = [{
    ID:1,
    START_DATE: '20/3/2021',
    END_DATE: '30/3/2021'
  },{
    ID:2,
    START_DATE: '1/4/2021',
    END_DATE: '10/4/2021'
  }];

  count: number = this.SurveyPeriods2.length

  constructor() { }

  ngOnInit(): void {
  }

}
