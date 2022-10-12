import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Survey } from 'src/app/survey';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css']
})
export class CardTableComponent implements OnInit {

  @Input() tableSurveys: Survey[];
  faCheck = faCheckCircle;
  displayColumns: string[] = ['Survey Name', 'Start Date', 'End Date', 'Survey Periods'];
  dataSource!: MatTableDataSource<Survey>;
  selection = new SelectionModel<Survey>(false, []);
  dashboardBtnStatus: boolean = true;
  dashboardSubscription: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {

    // console.log(this.tableSurveys)
    this.dataSource = new MatTableDataSource(this.tableSurveys)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Survey Name': return item.SurveyName;
        case 'Start Date': return item.SurveyPeriods[0].START_DATE;
        case 'End Date': return item.SurveyPeriods[0].END_DATE;
        case 'Survey Periods': return item.SurveyPeriods[0].START_DATE + item.SurveyPeriods[0].END_DATE;
      }
    }
  }

  // filterText(eve) {
  //   const filterValue = (eve.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  choosePeriod(value: any, row: any) {
    console.log(row);
    console.log(value);
  }

  onRowClick(value) {

    // console.log(value.SRV_ID)
    this.selection.toggle(value)
    if (this.selection.isSelected(value)) {
      this.dashboardService.toggleDashboardbtn(false, value.SRV_ID)
    } else {
      this.dashboardService.toggleDashboardbtn(true, value.SRV_ID)
    }
  }

}

