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
import { MatIconModule} from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-overall-plan',
  standalone: true,
  imports: [ CommonModule, MatInputModule, MatFormFieldModule, MatTableModule, MatSortModule, MatPaginatorModule, MatSelectModule, MatIconModule, MatSnackBarModule],
  templateUrl: './overall-plan.component.html',
  styleUrl: './overall-plan.component.scss'
})
export class OverallPlanComponent {

}
