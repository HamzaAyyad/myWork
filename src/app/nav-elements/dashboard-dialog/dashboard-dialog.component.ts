import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard-dialog',
  templateUrl: './dashboard-dialog.component.html',
  styleUrls: ['./dashboard-dialog.component.css']
})
export class DashboardDialogComponent implements OnInit {
  hasError: boolean = false;
  nameInput: string;
  dialogName: string = "";

  constructor(
    public dialogRef: MatDialogRef<DashboardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  surveyNameCheck(e) {
    let code = e.key.charCodeAt(0);
    if ((code >= 32 && code <= 126)) {
      if (this.dialogName.length < 4) {
        this.hasError = true;
      } else {
        this.hasError = false;
      }
    }
    else {
      this.hasError = true;
      e.preventDefault();
      return;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
