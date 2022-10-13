import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../services/dashboard.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component';

@Component({
  selector: 'app-nav-elements',
  templateUrl: './nav-elements.component.html',
  styleUrls: ['./nav-elements.component.css']
})
export class NavElementsComponent implements OnInit {
  circleInfo = faInfoCircle;
  viewBtnState: boolean = true;
  filterMenu: boolean = true;
  searchText:string;
  dashboardBtnSubscripe: Subscription;
  surveyNameSubsciption: Subscription;
  dashboardBtnState: boolean = true;
  @Output() onToggleView = new EventEmitter();

  constructor(private dashboardService: DashboardService, public dashboardDialog: MatDialog) {
    this.dashboardBtnSubscripe = this.dashboardService
      .onDashBtnToggle()
      .subscribe(value => this.dashboardBtnState = value);
  }

  ngOnInit(): void {
  }

  tabChange(event) {
    // console.log(event.tab.textLabel)
    this.dashboardBtnState = true;
    this.dashboardService.changeTab(event.tab.textLabel)
  }

  searchName() {
    // console.log(this.searchText)
    this.dashboardService.searchName(this.searchText)
  }

  openDashboardDialog() {
    const dialogRef = this.dashboardDialog.open(DashboardDialogComponent, {
      width: '300px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dashboardService.changeSurveyName(String(result));
      } else {
        alert('No new name added')
      }
    });
  }

  onIconClick(view: string) {
    if (view === 'grid') {
      this.viewBtnState = true;
    } else {
      this.viewBtnState = false;
    }
    this.onToggleView.emit(view);
  }
}
