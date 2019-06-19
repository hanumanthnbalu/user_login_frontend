import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {AuthGaurd} from './auth/auth-gaurd';

const routes: Routes = [
	{ path: '', redirectTo: '/postslists', pathMatch: 'full' },
	{ path: 'postslists', component: PostListComponent },
	{ path: 'postscreate', component: PostCreateComponent , canActivate:[AuthGaurd]},
	{ path: 'edit/:postId', component: PostCreateComponent , canActivate:[AuthGaurd]},
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AuthGaurd]
})
export class AppRoutingModule {}
