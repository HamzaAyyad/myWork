import { Component, OnInit, QueryList, ViewChildren, Input } from '@angular/core';
import { Survey } from '../../survey';
import { CardItemComponent } from '../card-item/card-item.component';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.css']
})
export class CardListComponent implements OnInit {

  @Input() gridSurveys: Survey[];
  selectedComponent;
  dashboardBtnStatus: boolean = true;
  dashboardSubscription: Subscription;
  @ViewChildren(CardItemComponent) list: QueryList<CardItemComponent>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {

    // this.dashboardSubscription.unsubscribe()
  }

  cardSelected(event) {

    if (event.value.selected) {
      this.dashboardService.toggleDashboardbtn(false, event.value.surveyItem.SRV_ID)
    } else {
      this.dashboardService.toggleDashboardbtn(true, event.value.surveyItem.SRV_ID)
    }
    this.selectedComponent = event.value.surveyItem
    this.list.forEach((item) => {
      item.unselect(Number(event.value.styleID))
    })
  }

}
