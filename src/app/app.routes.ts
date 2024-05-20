import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoursesComponent } from './courses/courses.component';

export const routes: Routes = [
    { path: 'courses', component: CoursesComponent},
    { path: '', redirectTo: '/courses', pathMatch: 'full'},
    { path: '404', component: NotFoundComponent},
    { path: '**', component: NotFoundComponent}
];
