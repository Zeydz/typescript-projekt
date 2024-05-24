import { Injectable } from '@angular/core';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  private readonly key: string = 'savedCourses';

  constructor() {}

  /* Hämta sparade kurser från localStorage */
  getCourses(): any[] {
    const savedData = localStorage.getItem(this.key);
    return savedData ? JSON.parse(savedData) : [];
  }

  /* Sparar nya kurslistor i localStorage */
  saveCourses(courses: Course[]): void {
    localStorage.setItem(this.key, JSON.stringify(courses));
  }

  /* Spara kurser i localStorage */
  addCourse(course: Course): void {
    const courses = this.getCourses();
    courses.push(course);
    this.saveCourses(courses);
  }

  /* Ta bort en specifik kurs från localStorage, filtrerar ut en ny lista utan den specifika kursen, därefter skickas till saveCourse som sparar de nya kurserna i localStorage */
  deleteCourse(courseCode: string): void {
    const savedCourses = this.getCourses();
    const updatedCourses = savedCourses.filter(
      (course: { courseCode: string }) => course.courseCode !== courseCode
    );
    this.saveCourses(updatedCourses);
  }

  /* Kontrollerar ifall en kurs redan är tillagd */
  isCourseAlreadyAdded(courseCode: string): boolean {
    const courses = this.getCourses();
    return courses.some((course) => course.courseCode === courseCode);
  }
}
