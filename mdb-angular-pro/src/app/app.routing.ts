import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './admin/category/category.component';
import { AdminComponent } from './admin/admin.component';
import { PollCreateComponent } from './admin/poll-create/poll-create.component';
import { PollManageComponent } from './admin/poll-manage/poll-manage.component';
import { AuthGuard } from './guards/auth.guard';

export const AppRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
              path: 'category',
              component: CategoryComponent,
              outlet: 'adminchild'
            },
            {
                path: 'pollcreate',
                component: PollCreateComponent,
                outlet: 'adminchild'
            },
            {
                path: 'pollmanage',
                component: PollManageComponent,
                outlet: 'adminchild'
            }
        ],
        canActivate: [AuthGuard]
    },

];