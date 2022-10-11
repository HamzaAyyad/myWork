import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  viewType:string = 'grid';

  constructor() { }

  ngOnInit(): void {
  }

  toggleView(eve) {
    console.log(eve)
    this.viewType = eve;
  }

}
