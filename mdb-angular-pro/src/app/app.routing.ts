import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './admin/category/category.component';
import { AdminComponent } from './admin/admin.component';
import { PollCreateComponent } from './admin/poll-create/poll-create.component';
import { PollManageComponent } from './admin/poll-manage/poll-manage.component';
import { AuthGuard } from './guards/auth.guard';
import { CategoryPageComponent } from './category-page/category-page.component';
import { UserCreateComponent } from './admin/user-create/user-create.component';
import { UserManageComponent } from './admin/user-manage/user-manage.component';
import { PollAssignComponent } from './admin/poll-assign/poll-assign.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { AllowedpollsComponent } from './admin/allowedpolls/allowedpolls.component';
import { PollResultComponent } from './admin/poll-result/poll-result.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'category/:slug',
        component: CategoryPageComponent
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
            },
            {
                path: 'usercreate',
                component: UserCreateComponent,
                outlet: 'adminchild'
            },
            {
                path: 'usermanage',
                component: UserManageComponent,
                outlet: 'adminchild'
            },
            {
                path: 'pollassign/:id',
                component: PollAssignComponent,
                outlet: 'adminchild'
            },
            {
                path: 'profile',
                component: ProfileComponent,
                outlet: 'adminchild'
            },
            {
                path: 'allowedpolls',
                component: AllowedpollsComponent,
                outlet: 'adminchild'
            },
            {
                path: 'pollresult/:id',
                component: PollResultComponent,
                outlet: 'adminchild'
            }
        ],
        canActivate: [AuthGuard]
    },

];