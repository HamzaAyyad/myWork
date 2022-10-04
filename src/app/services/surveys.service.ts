import { Injectable } from '@angular/core';
import { Survey } from '../survey';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {
  private apiUrl = 'https://mocki.io/v1/587487e5-787e-4059-95a7-585326f42589';

  constructor(private http:HttpClient) { }

  getSurvery(): Observable<Survey[]>{
    return this.http.get<Survey[]>(this.apiUrl);
  }
}
