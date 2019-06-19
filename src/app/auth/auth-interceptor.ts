import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    // console.log(req.headers.set('Authorization', 'Bearer ' + authToken));
    // console.log("authToken", authToken);
		const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
		});
    // console.log("headers", authRequest);
		return next.handle(authRequest);
	}
}
