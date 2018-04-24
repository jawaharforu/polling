import { ToastModule } from './typescripts/pro/alerts';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule } from './typescripts/free';
import { MDBBootstrapModulePro } from './typescripts/pro/index';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { MDBSpinningPreloader } from './typescripts/pro/index';
import { SideBarComponent } from './admin/side-bar/side-bar.component';
import { CategoryComponent } from './admin/category/category.component';
import { HomeComponent } from './home/home.component';
import { AppRoutes } from './app.routing';
import { AdminComponent } from './admin/admin.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CategoryService } from './services/category.service';
import { PollCreateComponent } from './admin/poll-create/poll-create.component';
import { PollService } from './services/poll.service';
import { PollManageComponent } from './admin/poll-manage/poll-manage.component';
import { CategoryNavComponent } from './category-nav/category-nav.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryContentComponent } from './category-content/category-content.component';
import { TruncateModule } from 'ng2-truncate';
import { NewlinePipe } from './pipes/newline.pipe';
import { VoteduserService } from './services/voteduser.service';
import { ResultService } from './services/result.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CategoryPageComponent } from './category-page/category-page.component';
import { UserCreateComponent } from './admin/user-create/user-create.component';
import { UserManageComponent } from './admin/user-manage/user-manage.component';
import { UserService } from './services/user.service';
import { ValidationService } from './services/validation.service';
import { PollAssignComponent } from './admin/poll-assign/poll-assign.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { AllowedpollsComponent } from './admin/allowedpolls/allowedpolls.component';
import { CeiboShare } from 'ng2-social-share';
import { PollResultComponent } from './admin/poll-result/poll-result.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { PollComponent } from './poll/poll.component';
import { NpIntelligenceComponent } from './np-intelligence/np-intelligence.component';
import { MediaInquiresComponent } from './media-inquires/media-inquires.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactService } from './services/contact.service';
import { NpIntelligenceManageComponent } from './admin/np-intelligence-manage/np-intelligence-manage.component';
import { ContactUsManageComponent } from './admin/contact-us-manage/contact-us-manage.component';
import { LinkService } from './services/link.service';
import { RunApollComponent } from './run-apoll/run-apoll.component';
import { DataTablesModule } from 'angular-datatables';
import { PreviousPollsComponent } from './previous-polls/previous-polls.component';
import { PublishedPollsComponent } from './published-polls/published-polls.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LifestyleComponent } from './lifestyle/lifestyle.component';


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    CategoryComponent,
    HomeComponent,
    AdminComponent,
    NavBarComponent,
    PollCreateComponent,
    PollManageComponent,
    CategoryNavComponent,
    FooterComponent,
    CategoryContentComponent,
    NewlinePipe,
    LoginComponent,
    CategoryPageComponent,
    UserCreateComponent,
    UserManageComponent,
    PollAssignComponent,
    ProfileComponent,
    AllowedpollsComponent,
    CeiboShare,
    PollResultComponent,
    PollComponent,
    NpIntelligenceComponent,
    MediaInquiresComponent,
    ContactUsComponent,
    WhatWeDoComponent,
    ContactFormComponent,
    NpIntelligenceManageComponent,
    ContactUsManageComponent,
    RunApollComponent,
    PreviousPollsComponent,
    PublishedPollsComponent,
    LifestyleComponent
  ],
  imports: [
    TruncateModule,
    BrowserModule,
    DataTablesModule,
    Ng2GoogleChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    ToastModule.forRoot(),
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
  // tslint:disable-next-line:max-line-length
  providers: [MDBSpinningPreloader, CategoryService, PollService, VoteduserService, ResultService, AuthService, AuthGuard, UserService, ValidationService, ContactService, LinkService],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
