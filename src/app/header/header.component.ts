<<<<<<< HEAD
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> dad8b77ea6d8072ac1ceb693cb6510b5bb90c274

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
})
<<<<<<< HEAD
export class HeaderComponent implements OnInit, OnDestroy {
	public username: string;
	private authListnerSubs: Subscription;
	userIsAuthenticated = false;

	constructor(private authService: AuthService) {}
	ngOnInit() {
		this.authListnerSubs = this.authService.getAuthStatusListner().subscribe((isAunthenticated) => {
      this.userIsAuthenticated = isAunthenticated;
      this.username = this.authService.getUsername();
		});
  }
	ngOnDestroy() {
		this.authListnerSubs.unsubscribe();
	}
	onLogout() {
		console.log('Logout');
		this.authService.logout();
	}
=======
export class HeaderComponent implements OnInit {
  username = '';
  	constructor() {}

  ngOnInit() {
    this.username = this.username;
  }

>>>>>>> dad8b77ea6d8072ac1ceb693cb6510b5bb90c274
}
