import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { NewPostComponent } from './post/new-post/new-post.component';

export const routes: Routes = [
    {path:'', component:DashboardComponent},
    {path:'categories', component:CategoriesComponent},
    {path:'posts', component:AllPostComponent},
    {path:'posts/new', component:NewPostComponent},
];
