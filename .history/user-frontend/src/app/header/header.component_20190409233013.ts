import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {
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
