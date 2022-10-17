import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Survey } from 'src/app/survey';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { AccessibilityService } from 'src/app/services/accessibility.service';


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
  textSizeInitial:string;
  textSize:string;
  textBtnState

  constructor(private accessService:AccessibilityService) { }

  ngOnInit(): void {
    this.periodsCount = this.surveyItem.SurveyPeriods.length;
    this.styleID = String(this.surveyItem.SRV_ID)

    this.textSizeInitial = localStorage.getItem('textSize')
    if (this.textSizeInitial === 'normal') {
      this.textBtnState = false
    } else {
      this.textBtnState = true
    }

    this.accessService.onTextSizeChange().subscribe(value => {
      this.textSize = value;
      if (this.textSize === 'normal') {
        this.textBtnState = false
      } else {
        this.textBtnState = true
      }
    })
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
