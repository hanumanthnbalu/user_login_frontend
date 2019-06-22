import { AuthInterceptor } from './auth/auth-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material.module';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { PostsModule } from './posts/posts.module';

@NgModule({
	declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    ErrorComponent
  ],
	imports: [
		BrowserModule,
    AppRoutingModule,
    PostsModule,
		BrowserAnimationsModule,
		NgMaterialModule,
		HttpClientModule
	],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ,
               { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true } 
            ],
  bootstrap: [ AppComponent ],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
