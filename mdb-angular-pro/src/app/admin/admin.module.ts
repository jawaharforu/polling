import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule } from '../typescripts/free';
import { MDBBootstrapModulePro } from '../typescripts/pro/index';
import { MDBSpinningPreloader } from '../typescripts/pro/index';
import { AgmCoreModule } from '@agm/core';
import { AdminComponent } from './admin.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CategoryComponent } from './category/category.component';
import { PollCreateComponent } from './poll-create/poll-create.component';
import { PollManageComponent } from './poll-manage/poll-manage.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { PollAssignComponent } from './poll-assign/poll-assign.component';
import { ProfileComponent } from './profile/profile.component';
import { AllowedpollsComponent } from './allowedpolls/allowedpolls.component';
import { PollResultComponent } from './poll-result/poll-result.component';
import { NpIntelligenceManageComponent } from './np-intelligence-manage/np-intelligence-manage.component';
import { ContactUsManageComponent } from './contact-us-manage/contact-us-manage.component';
import { AdminRoutes } from './admin.routing';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CategoryService } from '../services/category.service';
import { PollService } from '../services/poll.service';
import { VoteduserService } from '../services/voteduser.service';
import { ResultService } from '../services/result.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ValidationService } from '../services/validation.service';
import { ContactService } from '../services/contact.service';
import { LinkService } from '../services/link.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToastModule } from '../typescripts/pro/alerts';
import { AuthGuard } from '../guards/auth.guard';
import { VoterslistComponent } from './voterslist/voterslist.component';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forRoot(AdminRoutes),
    MDBBootstrapModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    MDBBootstrapModulePro.forRoot(),
    FlashMessagesModule.forRoot(),
    ToastModule.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    })
  ],
  declarations: [
    AdminComponent,
    SideBarComponent,
    CategoryComponent,
    PollCreateComponent,
    PollManageComponent,
    UserCreateComponent,
    UserManageComponent,
    PollAssignComponent,
    ProfileComponent,
    AllowedpollsComponent,
    PollResultComponent,
    NpIntelligenceManageComponent,
    ContactUsManageComponent,
    VoterslistComponent
  ],
  // tslint:disable-next-line:max-line-length
  providers: [MDBSpinningPreloader, CategoryService, PollService, VoteduserService, ResultService, AuthService, AuthGuard, UserService, ValidationService, ContactService, LinkService],
})
export class AdminModule { }
