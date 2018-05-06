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
import { PollComponent } from './poll/poll.component';
import { NpIntelligenceComponent } from './np-intelligence/np-intelligence.component';
import { MediaInquiresComponent } from './media-inquires/media-inquires.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { NpIntelligenceManageComponent } from './admin/np-intelligence-manage/np-intelligence-manage.component';
import { ContactUsManageComponent } from './admin/contact-us-manage/contact-us-manage.component';
import { RunApollComponent } from './run-apoll/run-apoll.component';
import { PreviousPollsComponent } from './previous-polls/previous-polls.component';
import { PublishedPollsComponent } from './published-polls/published-polls.component';
import { LifestyleComponent } from './lifestyle/lifestyle.component';
import { SinglepollComponent } from './singlepoll/singlepoll.component';
import { VoterslistComponent } from './admin/voterslist/voterslist.component';

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
        path: 'whatwedo',
        component: WhatWeDoComponent
    },
    {
        path: 'runapoll',
        component: RunApollComponent
    },
    {
        path: 'mediainquires',
        component: MediaInquiresComponent
    },
    {
        path: 'npintelligence',
        component: NpIntelligenceComponent
    },
    {
        path: 'lifestyle',
        component: LifestyleComponent
    },
    {
        path: 'previouspolls',
        component: PreviousPollsComponent
    },
    {
        path: 'contactus',
        component: ContactUsComponent
    },
    {
        path: 'poll/:slug',
        component: PollComponent
    },
    {
        path: 'publishedpolls',
        component: PublishedPollsComponent
    },
    {
        path: 'singlepoll/:pollid',
        component: SinglepollComponent
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
            {
                path: 'voterslist',
                component: VoterslistComponent,
                outlet: 'adminchild'
            }
        ],
        canActivate: [AuthGuard]
    },

];