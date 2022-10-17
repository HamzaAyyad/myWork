import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../services/dashboard.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component';
import { formatDate } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { AccessibilityService } from '../services/accessibility.service';

@Component({
  selector: 'app-nav-elements',
  templateUrl: './nav-elements.component.html',
  styleUrls: ['./nav-elements.component.css']
})
export class NavElementsComponent implements OnInit {
  circleInfo = faInfoCircle;
  viewBtnState: boolean = true;
  filterMenuToggle: boolean = true;
  filterButtinClick: boolean = false;
  calenderHeader: any;
  searchText: string;
  startDateInput: string = '';
  endDateInput: string = '';
  dashboardBtnSubscripe: Subscription;
  dashboardBtnState: boolean = true;
  textSize: string;
  textBtnState: boolean = false;
  darkBtnState: boolean = false;
  dialogHeight:string;
  dialogWidth:string;
  darkMode:string;
  @Output() onToggleView = new EventEmitter();


  constructor(
    private dashboardService: DashboardService,
    public dashboardDialog: MatDialog,
    private notificationService: NotificationService,
    private accessSevice: AccessibilityService) {

    this.dashboardBtnSubscripe = this.dashboardService
      .onDashBtnToggle()
      .subscribe(value => this.dashboardBtnState = value);

  }

  ngOnInit(): void {

    this.textSize = this.accessSevice.getKeyData('textSize');
    if (this.textSize === 'normal') {
      this.textBtnState = false
      this.dialogHeight = '250px';
      this.dialogWidth = '300px';
    } else {
      this.textBtnState = true
      this.dialogHeight = '325px';
      this.dialogWidth = '500px'
    }

    this.darkMode = this.accessSevice.getKeyData('darkMode')
    if (this.darkMode === 'light') {
      this.darkBtnState = false
    } else {
      this.darkBtnState = true
    }
  }

  tabChange(event) {
    this.dashboardBtnState = true;
    this.dashboardService.changeTab(event.tab.textLabel)
  }

  searchName() {
    this.dashboardService.searchName(this.searchText)
  }

  openDashboardDialog() {
    const dialogRef = this.dashboardDialog.open(DashboardDialogComponent, {
      width: this.dialogWidth,
      height: this.dialogHeight,
      data: {},
      panelClass: 'dialog-color'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dashboardService.changeSurveyName(String(result));
      } else {
        this.notificationService.showInfo('No new name added')
      }
    });

  }

  filterDate() {

    if (this.startDateInput || this.endDateInput) {
      this.notificationService.showError("Invalid date")
    } else {
      if (this.startDateInput < this.endDateInput) {
        this.filterMenuToggle = !this.filterMenuToggle;
        this.dashboardService.dateChange(formatDate(this.startDateInput, 'MM/dd/yyyy', 'en-US')
          , formatDate(this.endDateInput, 'MM/dd/yyyy', 'en-US'))
      } else {
        this.notificationService.showError('End date should be after Start Date')
      }
    }

  }

  toggleFilterMenu() {
    this.filterMenuToggle = !this.filterMenuToggle
    this.startDateInput = '';
    this.endDateInput = '';
  }

  onIconClick(view: string) {
    if (view === 'grid') {
      this.viewBtnState = true;
    } else {
      this.viewBtnState = false;
    }
    this.onToggleView.emit(view);
  }

  onTextBtnClick() {

    if (this.textBtnState) {
      this.accessSevice.setKey('textSize', 'normal')
      this.textBtnState = false;
      this.dialogHeight = '200px'
      this.dialogWidth = '300px'

    } else {
      this.accessSevice.setKey('textSize', 'large')
      this.textBtnState = true
      this.dialogHeight = '325px'
      this.dialogWidth = '500px'
    }
  }

  onDarkBtnClick() {
    if (this.darkBtnState) {
      document.body.style.backgroundColor = 'rgb(245, 243, 243)'
      this.darkBtnState = false;
      this.accessSevice.setKey('darkMode', 'light')
    } else {
      document.body.style.backgroundColor = 'black'
      this.darkBtnState = true
      this.accessSevice.setKey('darkMode', 'dark')
    }
  }
}
