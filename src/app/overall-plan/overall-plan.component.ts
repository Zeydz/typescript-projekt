import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Course } from '../model/course';
import { CommonModule } from '@angular/common';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LocalstorageService } from '../service/localstorage.service';

@Component({
  selector: 'app-overall-plan',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './overall-plan.component.html',
  styleUrls: ['./overall-plan.component.scss'],
})
export class OverallPlanComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'courseCode',
    'courseName',
    'points',
    'subject',
    'syllabus',
    'delete',
  ];
  dataSource: MatTableDataSource<Course>;
  totalPoints: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private localStorageService: LocalstorageService, private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<Course>();
  }

  /* Kör dessa funktioner vid initiering */
  ngOnInit(): void {
    this.loadCourses();
    this.calculateTotalPoints();
  }

  /* Gör att endast valt antal rader visas, även hur många resultat totalt det finns */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  /* Ladda kurser från localstorage*/
  loadCourses(): void {
    const courses = this.localStorageService.getCourses();
    this.dataSource.data = courses;
  }

  /* Ta bort en kurs, använder service */
  deleteCourse(course: Course): void {
    this.localStorageService.deleteCourse(course.courseCode);
    this.loadCourses();
    this.calculateTotalPoints();
    this.snackBar.open(`${course.courseName} har tagits bort från dina sparade kurser.`, 'Stäng', {
      duration: 3000,

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

  /* Räkna ihop poäng från lagrade kurser */
  calculateTotalPoints(): void {
    const courses = this.localStorageService.getCourses();
    this.totalPoints = courses.reduce((total, course) => total + course.points, 0);
  }
}
