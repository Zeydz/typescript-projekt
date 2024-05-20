
import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Course } from '../model/course';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  error: string | null = null;
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject'];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getCourses();
  }
  getCourses(): void {
    this.dataService.getCourses().subscribe({
      next: (data: Course[]) => {
        this.courses = data;
      },
      error: (error) => {
        this.error = 'Misslyckades att ladda kurser';
        console.error('Error fetching courses', error);
      },
      complete: () => {
        console.log('Kursdata laddades framgångsrikt.');
      }
    });
  }
}
