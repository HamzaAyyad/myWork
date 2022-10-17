import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
private textSizeSubject = new BehaviorSubject<string>(this.getKeyData('textSize'))
private darkModeSubject = new BehaviorSubject<string>(this.getKeyData('darkMode'))

  constructor() { }

  setKey(key:string, data:string) {
    localStorage.setItem(key,data);
    if (data === 'normal' || data === 'large'){
      console.log(data)
      this.textSizeSubject.next(data);
    } else {
      console.log(data)
      this.darkModeSubject.next(data);
    }
  }

  getKeyData(key:string): string {
    return localStorage.getItem(key);
  }

  onTextSizeChange(): Observable<string> {
    return this.textSizeSubject.asObservable();
  }

  onDarkModeChange(): Observable<string> {
    return this.darkModeSubject.asObservable();
  }
}
