  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { AuthData } from './auth-data.model';
  import { Subject } from 'rxjs';
  import { Router } from '@angular/router';

  import { environment } from '../../environments/environment';
  
  const BACKEND_URL = environment.apiUrl + '/users/';
  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private token: string;
    private isAuthenticated = false;
    private tokenTimer: any;
    private authStatusListner = new Subject<boolean>();
    private authDetails;
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
        }>(BACKEND_URL+ 'signup', authData)
        .subscribe(
          (response) => {
            // let message = response.message;
            this.router.navigate([ '/' ]);
            // alert(message);
          },
          (error) => {
            this.authStatusListner.next(false);
            console.log(error);
          }
        );
    }

    getToken() {
      return this.token;
    }

    getUsername() {
      return this.username;
    }
    getAuthDetails() {
        // console.log("authDetails",this.authDetails);
      return this.authDetails;
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
          username: string;
          // user: { username: string; email: string };
        }>(BACKEND_URL + 'login', authData)
        .subscribe(
          (response) => {
            this.authDetails = response;
            const token = response.token;
            this.token = token;
            this.username = response.username;
            // console.log("AuthUser:",this.username);
          if (token) {
                  const expiresInDuration = response.expiresIn;
                  this.setAuthtimer(expiresInDuration);
                  this.isAuthenticated = true;
                  this.userId = response.userId;
                  this.authStatusListner.next(true);
                  const now = new Date();
                  const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                  this.saveAuthData(token, expirationDate, this.userId, this.username);
                  this.router.navigate([ '/' ]);
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
        this.userId = authInforamtion.userId;
        this.username = authInforamtion.username;
        this.setAuthtimer(expiresIn / 1000);
        this.authStatusListner.next(true);
      }
    }

    logout() {
      this.token = null;
      this.isAuthenticated = false;
      this.username = null;
      this.userId = null;
      this.authStatusListner.next(false);
      clearTimeout(this.tokenTimer);
      this.clearAuthData();
      this.router.navigate([ '/' ]);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string, username: string) {
      localStorage.setItem('userToken', token);
      localStorage.setItem('expiration', expirationDate.toISOString());
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
    }
    private clearAuthData() {
      localStorage.removeItem('userToken');
      localStorage.removeItem('expiration');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
    }

    getUserId() {
      return this.userId;
    }

    private getAuthData() {
      const token = localStorage.getItem('userToken');
      const expirationDate = localStorage.getItem('expiration');
      const userId = localStorage.getItem('userId');
      const username = localStorage.getItem('username');
      if (!token && !expirationDate) {
        return;
      }
      return {
        token: token,
        expirationDate: new Date(expirationDate),
        userId: userId,
        username: username
      };
    }

    private setAuthtimer(duration: number) {
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, duration * 1000);
    }
  }
