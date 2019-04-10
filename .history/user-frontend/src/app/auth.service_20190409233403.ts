import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient) {}

	createUser(username: string, email: string, password: string) {
		const authData: AuthData = {
			username: username,
			email: email,
			password: password
		};
    this.http.post("http://localhost:3000/api/users/signup", authData)
    .subscribe((response) => {
			console.log(response);
		});
  }
  getUsername(username:string) {
    
  }

  login (email: string, password: string){
    const authData: AuthData = {
			email: email,
			password: password
		};
    this.http.post("http://localhost:3000/api/users/login", authData)
    .subscribe((response) => {
			console.log(response);
		});
  }
}
