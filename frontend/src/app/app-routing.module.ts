import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './user/sign-in/sign-in.component';

import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'signin', component: SignInComponent },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
