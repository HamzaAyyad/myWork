import { Component, OnInit } from '@angular/core';
import { AccessibilityService } from '../services/accessibility.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  viewType: boolean = true;
  darkModeInitial:string;
  darkMode:string;
  darkBtnState:boolean;

  constructor(private accessService:AccessibilityService) { }

  ngOnInit(): void {

    this.darkModeInitial = this.accessService.getKeyData('darkMode')
    if (this.darkModeInitial === 'light') {
      this.darkBtnState = false
    } else {
      this.darkBtnState = true
    }

    this.accessService.onDarkModeChange().subscribe(value => {
      this.darkMode = value;
      if (this.darkMode === 'light') {
        this.darkBtnState = false
      } else {
        this.darkBtnState = true
      }
    })
  }

  toggleView(eve) {
    console.log(eve)
    if (eve === 'grid') {
      this.viewType = true;
    } else {
      this.viewType = false;
    }
  }

}
