import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private readonly key: string = 'savedCourses';

  constructor() { }

  /* Hämta sparade kurser från localStorage */
  getCourses(): any[] {
    const savedData = localStorage.getItem(this.key);
    return savedData ? JSON.parse(savedData) : [];
  }

  /* Spara kurser i localStorage */
  saveCourses(courses: any[]): void {
    localStorage.setItem(this.key, JSON.stringify(courses));
  }

  /* Ta bort alla sparade kurser från localStorage */
  clearCourses(): void {
    localStorage.removeItem(this.key);
  }

    /* Ta bort en specifik kurs från localStorage */
    deleteCourse(courseCode: string): void {
      const savedCourses = this.getCourses();
      const updatedCourses = savedCourses.filter((course: { courseCode: string }) => course.courseCode !== courseCode);
      this.saveCourses(updatedCourses);
    }
}
