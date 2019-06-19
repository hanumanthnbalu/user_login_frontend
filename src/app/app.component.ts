<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
	constructor(private authService: AuthService) {}
	ngOnInit() {
		this.authService.autoAuthUser();
	}
=======
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-frontend';
>>>>>>> dad8b77ea6d8072ac1ceb693cb6510b5bb90c274
}
