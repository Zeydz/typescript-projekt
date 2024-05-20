import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Course } from '../model/course'; 
import { DataService } from '../service/data.service'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [ CommonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
/* Implementera AfterViewInit  */
export class CoursesComponent implements AfterViewInit {

  displayedColumns: string[] = ['courseCode', 'subjectCode', 'level', 'progression', 'courseName', 'points', 'institutionCode', 'subject']; 
  dataSource: MatTableDataSource<Course>; 

  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  constructor(private dataService: DataService) { 
    this.dataSource = new MatTableDataSource<Course>(); 
  }

  ngAfterViewInit(): void { 
    this.dataSource.paginator = this.paginator; 
    this.loadCourses();
  }

  loadCourses(): void { 
    this.dataService.getCourses().subscribe({ 
      next: (data: Course[]) => {
        this.dataSource.data = data; 
      },
      error: (error) => { 
        console.error('Fel vid fetch av kurser', error); 
      }
    });
  }

  applyFilter(event: Event): void { 
    const filterValue = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filterValue.trim().toLowerCase(); 
    if (this.dataSource.paginator) { 
      this.dataSource.paginator.firstPage();
    }
  }
}
