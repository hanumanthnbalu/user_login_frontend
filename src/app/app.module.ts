<<<<<<< HEAD
import { AuthInterceptor } from './auth/auth-interceptor';
=======
>>>>>>> dad8b77ea6d8072ac1ceb693cb6510b5bb90c274
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

<<<<<<< HEAD
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material.module';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from './auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
	declarations: [ AppComponent, LoginComponent, SignupComponent, HeaderComponent, PostCreateComponent, PostListComponent, NotFoundComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
		HttpClientModule
	],
	providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
=======
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material.module';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
>>>>>>> dad8b77ea6d8072ac1ceb693cb6510b5bb90c274
