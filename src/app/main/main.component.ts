import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  viewType: boolean = true;

  constructor() { }

  ngOnInit(): void {
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
