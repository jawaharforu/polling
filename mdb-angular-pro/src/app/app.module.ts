import { ToastModule } from './typescripts/pro/alerts/toast/toast.module';
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
    NewlinePipe
  ],
  imports: [
    TruncateModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    ToastModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModulePro.forRoot(),
    FlashMessagesModule.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    })
  ],
  providers: [MDBSpinningPreloader, CategoryService, PollService],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
