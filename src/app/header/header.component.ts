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
}
