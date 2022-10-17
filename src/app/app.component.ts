import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'AL-KHWARIZMI';
  circleInfo = faInfoCircle;
  searchIcon = faSearch;

  constructor(){}

  ngOnInit(): void {
  }
}
