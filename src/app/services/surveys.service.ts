import { Injectable } from '@angular/core';
import { Survey } from '../survey';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {
  private apiUrl = 'https://mocki.io/v1/bf84746c-ec9a-4230-8517-68d409b860f1';

  constructor(private http:HttpClient) { }

  getSurvery(): Observable<Survey[]>{
    return this.http.get<Survey[]>(this.apiUrl);
  }
}
