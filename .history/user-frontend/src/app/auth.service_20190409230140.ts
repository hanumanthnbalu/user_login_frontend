import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient) {}

	createUser(username: string, emai: string, password: string) {
		const authData: AuthData = {
			username: username,
			emial: email,
			password: password
		};
		this.http.post('http://localhost:3000/api/user/signup', authData).subscribe((response) => {
			console.log(response);
		});
	}
}
