import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { DeleteAccountPopupComponent } from './delete-account-popup/delete-account-popup.component';
import { ForgotpasswordFormComponent } from './forgotpassword-form/forgotpassword-form.component';
import { InitialFormComponent } from './initial-form/initial-form.component';
import { InitialHeaderComponent } from './initial-header/initial-header.component';
import { LocalstorageService } from './localstorage.service';
import { MainFormComponent } from './main-form/main-form.component';
import { AdminUpdateFormComponent } from './modules/user/admin-update-form/admin-update-form.component';
import { UserService } from './modules/user/user.service';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { UpdateAccountFormComponent } from './update-account-form/update-account-form.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialFormComponent,
    MainFormComponent,
    SigninFormComponent,
    SignupFormComponent,
    ChangePasswordFormComponent,
    UpdateAccountFormComponent,
    DeleteAccountPopupComponent,
    ForgotpasswordFormComponent,
    InitialHeaderComponent,
    AdminUpdateFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatSnackBarModule,
    AppRoutingModule,
    // RouterModule.forRoot([
    //   { path: '', component: InitialFormComponent },
    //   { path: 'signin', component: SigninFormComponent },
    //   { path: 'signup', component: SignupFormComponent },
    //   { path: 'main', component: MainFormComponent },
    //   { path: 'changepassword', component: ChangePasswordFormComponent },
    //   { path: 'updateaccount', component: UpdateAccountFormComponent },
    //   { path: 'forgotpassword', component: ForgotpasswordFormComponent },
    //   { path: 'adminmain', component: AdminMainFormComponent },
    //   { path: 'adminupdate', component: AdminUpdateFormComponent, data: { data: {} } },
    //   { path: 'createuser', component: AdminCreateUserFormComponent },
    //   { path: 'edituser', component: AdminCrudUserFormComponent },
    //   { path: 'setsuser', component: SetsCrudFormComponent },
    //   { path: 'addSet', component: AddSetComponent },
    //   { path: 'editSet', component: EditSetComponent },
    //   { path: 'stakeholdersUser', component: StakeholdersCrudFormComponent },
    //   { path: 'createStakeholder', component: CreateStakeholderComponent },
    //   { path: 'objectivesUser', component: ObjectivesCrudFormComponent },
    //   { path: 'editStakeholder', component: EditStakeholderComponent },
    //   { path: 'editObjective', component: EditObjectiveComponent },
    //   { path: 'createObjective', component: CreateObjectiveComponent },
    //   { path: 'assignObjective', component: AssignObjectivesComponent },
    //   { path: 'assignPriority', component: AssignPriorityComponent },
    //   { path: 'updatePriority', component: AssignPriorityUpdateComponent },
    //   { path: 'adminEditSet', component: AdminEditSetComponent },
    //   { path: 'adminEditObjective', component: AdminEditObjectiveComponent },
    //   { path: 'adminAddStakeholderObjective', component: AdminAddStakeholderObjectiveComponent },
    //   { path: 'adminUpdateStakeholderObjective', component: AdminUpdateStakeholderObjectiveComponent },
    //   { path: 'adminEditStakeholder', component: AdminEditStakeholderComponent },
    //   { path: 'adminAddSet', component: AdminAddSetComponent}
    // ])
  ],
  providers: [
    UserService,
    HttpClient,
    LocalstorageService, { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
