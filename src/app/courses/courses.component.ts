import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Course } from '../model/course'; 
import { DataService } from '../service/data.service'; 
import { CommonModule } from '@angular/common'; 
import { MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [ CommonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatSortModule, MatPaginatorModule, MatSelectModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
/* Implementera AfterViewInit  */
export class CoursesComponent implements AfterViewInit {
  /* Variabler */
  displayedColumns: string[] = ['courseCode', 'subjectCode', 'level', 'progression', 'courseName', 'points', 'institutionCode', 'subject']; 
  dataSource: MatTableDataSource<Course>; 
  uniqueSubjects: string[];
  
  /* Definierar Paginator */
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  /* Constructor som körs direkt */
  constructor(private dataService: DataService) { 
    this.dataSource = new MatTableDataSource<Course>(); 
    this.uniqueSubjects = []
  }

  /* Ändrar paginator efter innehåll */
  ngAfterViewInit(): void { 
    this.dataSource.paginator = this.paginator; 
    this.loadCourses();
  }

  /* Ladda kurser från JSON-länk, skickar till dataSource */
  loadCourses(): void { 
    this.dataService.getCourses().subscribe({ 
      next: (data: Course[]) => {
        this.dataSource.data = data; 
        this.uniqueSubjects = this.getUniqueSubjects(data);
      },
      error: (error) => { 
        console.error('Fel vid fetch av kurser', error); 
      }
    });
  }

  /* Filter för att sortera sökning */
  applyFilter(event: Event): void { 
    const filterValue = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filterValue.trim().toLowerCase(); 
    if (this.dataSource.paginator) { 
      this.dataSource.paginator.firstPage();
    }
  }

  /* Funktion för att filtrera kurser baserat på ämne */
  filterCoursesBySubject(subject: string): void {
    if (subject) {
      this.dataSource.filterPredicate = (data: Course, filter: string) => {
        return data.subject.toLowerCase().trim() === filter;
      };
      this.dataSource.filter = subject.toLowerCase().trim();
    } else {
      this.dataSource.filter = '';
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  /* Hämtar ämnena och returnerar */
  getUniqueSubjects(courses: Course[]): string[] {
    const subjects = courses.map(course => course.subject);
    return Array.from(new Set(subjects));
  }
}