import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit, OnDestroy {
	public username: string;
	private authListnerSubs: Subscription;
	userIsAuthenticated = false;

	constructor(private authService: AuthService) {}
	ngOnInit() {
		// this.username = this.authService.getAuthDetails();
		// console.log("HeaderUser:w",this.username);
    this.userIsAuthenticated = this.authService.getIsAuth();
	  this.authListnerSubs = this.authService.getAuthStatusListner().subscribe((isAunthenticated) => {
		this.userIsAuthenticated = isAunthenticated;
		// let userInfo = this.authService.getAuthDetails();
		// this.username = userInfo.username;
		// console.log("HeaderUser:",this.username);
	});
  }
	ngOnDestroy() {
		this.authListnerSubs.unsubscribe();
	}
	onLogout() {
		this.authService.logout();
		this.username = null;
	}
}
