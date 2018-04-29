import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { AdminComponent } from './admin.component';
import { PollCreateComponent } from './poll-create/poll-create.component';
import { PollManageComponent } from './poll-manage/poll-manage.component';
import { AuthGuard } from '../guards/auth.guard';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { PollAssignComponent } from './poll-assign/poll-assign.component';
import { ProfileComponent } from './profile/profile.component';
import { AllowedpollsComponent } from './allowedpolls/allowedpolls.component';
import { PollResultComponent } from './poll-result/poll-result.component';
import { NpIntelligenceManageComponent } from './np-intelligence-manage/np-intelligence-manage.component';
import { ContactUsManageComponent } from './contact-us-manage/contact-us-manage.component';
export const AdminRoutes: Routes = [
    {
        path: '',
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
            },
            {
                path: 'npintelligencemanage',
                component: NpIntelligenceManageComponent,
                outlet: 'adminchild'
            },
            {
                path: 'contactusmanage',
                component: ContactUsManageComponent,
                outlet: 'adminchild'
            },
        ],
        canActivate: [AuthGuard]
    },

];