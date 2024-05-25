import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  /* URL */
  private url =
    'https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json';

  /* Definierar HttpClient */
  constructor(private http: HttpClient) {}

  /* Hämtar kurser från URL ed HttpClient */
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }
}
