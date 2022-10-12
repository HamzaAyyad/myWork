import { Injectable } from '@angular/core';
import { Survey } from '../survey';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {
  private apiUrl = 'https://mocki.io/v1/f2d2f70b-cd44-42c5-95a7-b7e64bc1ebc4';

  constructor(private http: HttpClient) { }

  getSurvery(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.apiUrl);
  }
}
