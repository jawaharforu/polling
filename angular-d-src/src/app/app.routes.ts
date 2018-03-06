import { Routes } from '@angular/router';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';

export const AppRoutes: Routes = [
    {
        path: 'create-category',
        component: CreateCategoryComponent
    },
    {
        path: 'manage-category',
        component: ManageCategoryComponent
    }
];