import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Survey } from 'src/app/survey';
import { SurveysService } from 'src/app/services/surveys.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css']
})
export class CardTableComponent implements OnInit, AfterViewInit {
  surveys:Survey[] = [];
  displayColumns:string[] = ['Survey Name', 'Start Date', 'End Date', 'Survey Periods']; 
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort: MatSort;
  dataSource!: MatTableDataSource<Survey>;
  start_date;
  end_date;

  constructor(private surveyService:SurveysService) {

    this.surveyService.getSurvery().subscribe((surveys) => {
      this.surveys = surveys
      this.surveys.forEach(item => {
        item.SurveyPeriods = JSON.parse(item.SurveyPeriods)
      })
      this.dataSource = new MatTableDataSource(this.surveys)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch(property){
            case 'Survey Name': return item.SurveyName
            case 'Start Date' : return item.SurveyPeriods[0].START_DATE
            case 'End Date' : return item.SurveyPeriods[0].END_DATE
          }
        }
    })
    
  }
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
  }

  choosePeriod(value: any, row:any) {
    console.log(row);
    console.log(value);
    this.start_date = row.SurveyPeriods[row.SurveyPeriods.findIndex(dates => dates.ID === value.ID)].START_DATE;
    this.end_date = row.SurveyPeriods[row.SurveyPeriods.findIndex(dates => dates.ID === value.ID)].END_DATE
  }


}

