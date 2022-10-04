import { Component, OnInit } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-elements',
  templateUrl: './nav-elements.component.html',
  styleUrls: ['./nav-elements.component.css']
})
export class NavElementsComponent implements OnInit {
  circleInfo = faInfoCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
