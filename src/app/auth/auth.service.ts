import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private token: string;
	private isAuthenticated = false;
	private tokenTimer: any;
	private authStatusListner = new Subject<boolean>();

	private userId: string;
	public username: string;

	constructor(private http: HttpClient, private router: Router) {}

	createUser(username: string, email: string, password: string) {
		const authData: AuthData = {
			username: username,
			email: email,
			password: password
		};
		this.http
			.post<{
				message: string;
				user: { username: string; email: string };
			}>('http://localhost:3000/api/users/signup', authData)
			.subscribe(
				(response) => {
					let message = response.message;
					this.router.navigate([ '/' ]);
					alert(message);
				},
				(error) => {
					this.authStatusListner.next(false);
					console.log(error);
				}
			);
	}

	getToken() {
    // console.log("TOKEN:",this.token);
		return this.token;
	}

	getUsername() {
    // console.log('username: ', this.username);
		return this.username;
	}

	getAuthStatusListner() {
		return this.authStatusListner.asObservable();
	}
	getIsAuth() {
		return this.isAuthenticated;
	}

	login(email: string, password: string) {
		const authData: AuthData = {
			email: email,
			password: password
		};
		this.http
			.post<{
				token: string;
				expiresIn: number;
				userId: string;
				message: string;
				user: { username: string; email: string };
			}>('http://localhost:3000/api/users/login', authData)
			.subscribe(
				(response) => {
          const token = response.token;
					this.token = token;
					// console.log("response", this.token);
					this.username = response.user.username;
          // let message = response.message;
          // alert(message + " " + this.username);
					if (token) {
						// const expiresInDuration = response.expiresIn;
						// console.log(expiresInDuration);
						// this.setAuthtimer(expiresInDuration);
						this.isAuthenticated = true;
						this.userId = response.userId;
						this.authStatusListner.next(true);
						// const now = new Date();
						// const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
						// this.saveAuthData(token, expirationDate, this.userId);
						// console.log('expirationDate', expirationDate);
						this.router.navigate([ '/' ]);
						// alert(message);
					}
				},
				(error) => {
					this.authStatusListner.next(false);
				}
			);
	}

	autoAuthUser() {
		const authInforamtion = this.getAuthData();
		if (!authInforamtion) {
			return;
		}
		const now = new Date();
		const expiresIn = authInforamtion.expirationDate.getTime() - now.getTime();
		if (expiresIn > 0) {
			this.token = authInforamtion.token;
			this.isAuthenticated = true;
			this.username = authInforamtion.username;
			this.setAuthtimer(expiresIn / 1000);
			this.authStatusListner.next(true);
		}
	}

	logout() {
		this.token = null;
		this.isAuthenticated = false;
		this.username = null;
		this.authStatusListner.next(false);
		clearTimeout(this.tokenTimer);
		this.clearAuthData();
		this.router.navigate([ '/' ]);
	}

	private saveAuthData(token: string, expirationDate: Date, userId: string) {
		localStorage.setItem('Token', token);
		localStorage.setItem('expiration', expirationDate.toISOString());
		localStorage.setItem('userId', userId);
	}
	private clearAuthData() {
		localStorage.removeItem('Token');
		localStorage.removeItem('expiration');
		localStorage.removeItem('userId');
	}

	getUserId() {
		return this.userId;
	}

	private getAuthData() {
		const token = localStorage.getItem('token');
		const expirationDate = localStorage.getItem('expiration');
		const username = localStorage.getItem('usrname');
		if (!token && !expirationDate) {
			return;
		}
		return {
			token: token,
			expirationDate: new Date(expirationDate),
			username: username
		};
	}

	private setAuthtimer(duration: number) {
		console.log('setting timer:' + duration);
		this.tokenTimer = setTimeout(() => {
			this.logout();
		}, duration * 1000);
	}
}
