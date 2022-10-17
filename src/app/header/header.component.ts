import { Component, OnInit } from '@angular/core';
import { AccessibilityService } from '../services/accessibility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  textBtnState:boolean;
  textSizeInitial:string;
  textSize:string;

  constructor(private accessService:AccessibilityService) { }

  ngOnInit(): void {
    this.textSizeInitial = this.accessService.getKeyData('textSize')
    if (this.textSizeInitial === 'normal') {
      this.textBtnState = false
    } else {
      this.textBtnState = true
    }

    this.accessService.onTextSizeChange().subscribe(value => {
      this.textSize = value
      if (this.textSize === 'normal') {
        this.textBtnState = false
      } else {
        this.textBtnState = true
      }
    })
  }

}
