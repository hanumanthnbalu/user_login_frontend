import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { PostData } from '../post-data.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: [ './post-list.component.scss' ]
})
export class PostListComponent implements OnInit, OnDestroy {
	posts: PostData[] = [];
	private postsSub: Subscription;
  userIsAuthenticated = false;
  totalPost = 10;
  postPerPage = 2;
  pageSizeOptions = [1,2,5,10];
  currentPage = 1;
  maxPost = this.posts.length;

	constructor(public postService: PostService, private authService: AuthService, private router: Router) {}

	isAuth() {
		this.authService.getAuthStatusListner().subscribe((isAunthenticated) => {
			this.userIsAuthenticated = isAunthenticated;
		});
	}
	ngOnInit() {
		this.postService.getPosts(this.postPerPage, 1);
		this.postsSub = this.postService.getPostUpdatedListner().subscribe((posts: PostData[]) => {
      // console.log('posts', posts);
      this.posts = posts;
    });
   this.userIsAuthenticated = this.authService.getIsAuth();
    this.authService.getAuthStatusListner().subscribe((isAunthenticated) => {
			this.userIsAuthenticated = isAunthenticated;
		});
	}
	onDelete(postId: string) {
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postPerPage, this.currentPage);
    });
  }
  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postService.getPosts(this.postPerPage, this.currentPage);
  }

	ngOnDestroy() {
    this.postsSub.unsubscribe();
	}

}
