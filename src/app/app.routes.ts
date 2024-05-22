import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoursesComponent } from './courses/courses.component';
import { OverallPlanComponent } from './overall-plan/overall-plan.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'courses', component: CoursesComponent},
    { path: 'overall-plan', component: OverallPlanComponent},
    { path: '', redirectTo: '/courses', pathMatch: 'full'},
    { path: '404', component: NotFoundComponent},
    { path: '**', component: NotFoundComponent}
];
