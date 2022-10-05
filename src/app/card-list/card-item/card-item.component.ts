import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Survey } from 'src/app/survey';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'; 


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
  faCheck = faCheckCircle;
  @Input() surveyItem: Survey;
  @Output() cardClicked = new EventEmitter();
  surveyPeriods:any[];
  private _selected:boolean;
  styleID:string;


  constructor() { }

  get selected():boolean {
    return this._selected;
  }

  set selected(value: boolean) {
    this._selected = value;
    if (this.selected) {
      document.getElementById(this.styleID)
      .classList.add(`card-${this.surveyItem.SURVEY_STATUS_EN}-active`);
    } else {
      document.getElementById(this.styleID)
      .classList.remove(`card-${this.surveyItem.SURVEY_STATUS_EN}-active`);
    }
  }

  ngOnInit(): void {
    this.surveyPeriods = JSON.parse(this.surveyItem.SurveyPeriods);
    this.styleID = String(this.surveyItem.SRV_ID)
  }

  onCardSelect(){
    this.selected = !this.selected;
    this.cardClicked.emit({value: this})
  }


}
