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
  surveyPeriods: any[];
  selected: boolean = false;
  styleID: string;
  periodsCount: number;

  constructor() { }

  ngOnInit(): void {
    this.periodsCount = this.surveyItem.SurveyPeriods.length;
    this.styleID = String(this.surveyItem.SRV_ID)
  }

  onCardSelect() {
    this.selected = !this.selected;
    this.cardClicked.emit({ value: this })
    if (this.selected) {
      document.getElementById(this.styleID)
        .classList.add(`card-${this.surveyItem.SURVEY_STATUS_EN}-active`);
    } else {
      document.getElementById(this.styleID)
        .classList.remove(`card-${this.surveyItem.SURVEY_STATUS_EN}-active`);
    }
  }

  unselect(cardId: number) {
    if (cardId === this.surveyItem.SRV_ID) {
      document.getElementById(this.styleID)
        .classList.add(`card-${this.surveyItem.SURVEY_STATUS_EN}-active`);
    } else {
      this.selected = false;
      document.getElementById(this.styleID)
        .classList.remove(`card-${this.surveyItem.SURVEY_STATUS_EN}-active`);
    }
  }
}
