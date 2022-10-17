import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccessibilityService } from 'src/app/services/accessibility.service';


@Component({
  selector: 'app-dashboard-dialog',
  templateUrl: './dashboard-dialog.component.html',
  styleUrls: ['./dashboard-dialog.component.css']
})
export class DashboardDialogComponent implements OnInit {
  hasError: boolean = false;
  textSizeInitial:string
  textSize:string
  textBtnState:boolean;
  nameInput: string;
  dialogName: string = "";

  constructor(
    public dialogRef: MatDialogRef<DashboardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accessService:AccessibilityService
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
    this.textSizeInitial = this.accessService.getKeyData('textSize')
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

}
