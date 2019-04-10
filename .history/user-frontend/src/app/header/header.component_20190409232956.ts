import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent implements OnInit {
	constructor(public authService: AuthService) {}

	ngOnInit() {}
	onSignup(form: NgForm) {
		if (form.invalid) {
			return;
		}
		this.authService.createUser(form.value.username, form.value.email, form.value.password);
		console.log(form.value);
	}
}
