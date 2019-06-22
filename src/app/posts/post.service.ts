  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { PostData } from './post-data.model';
  import { Subject } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Router } from '@angular/router';
  import { environment } from '../../environments/environment';
  
  const BACKEND_URL = environment.apiUrl + '/posts/post/';
  const BACKEND_URL_GET = environment.apiUrl + '/posts';

  @Injectable({
    providedIn: 'root'
  })
  export class PostService {
    private posts: PostData[] = [];
    private postsUpdated = new Subject<PostData[]>();
    constructor(private http: HttpClient, private router: Router) {}

    createPost(title: string, content: string, image: File) {
      const postData = new FormData();
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
      this.http.post(BACKEND_URL, postData)
      .subscribe((responsePost) => {
        this.postsUpdated.next([ ...this.posts ]);
        this.router.navigate([ '/' ]);
      });
    }
      getPostUpdatedListner() {
      return this.postsUpdated.asObservable();
    }

    getPosts(postPerPage: number, currentPage: number) {
      const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
      this.http
        .get<{ message: string; post: any, count: number }>( BACKEND_URL_GET + queryParams)
        .pipe(
          map((postData) => {
            // console.log("Before",postData);
            return { posts: postData.post.map((post) => {
              return {
                title: post.title,
                content: post.content,
                _id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
            count: postData.count
          };
          })
        )
        .subscribe(transformedPostData => {
          this.posts = transformedPostData.posts;
          this.postsUpdated.next([...this.posts]);
          // this.postsUpdated.next({
          //   post: [...this.posts],
          //   count: transformedPostData.count
          // });
        });
    }
    getPost(_id: string) {
      return this.http.get<{ _id: string; title: string; content: string; imagePath: string; creator: string }>(
        BACKEND_URL+ _id
      );
    }

    updatePost(_id: string, title: string, content: string, image: File | string) {
      let postData: PostData | FormData;
      if (typeof image === 'object') {
        postData = new FormData();
        postData.append('id', _id);
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);
      } else {
        postData = {
          _id: _id,
          title: title,
          content: content,
          imagePath: image,
          creator: null
        };
      }
      this.http.put(BACKEND_URL + _id, postData)
      .subscribe((updatedPost) => {
        this.postsUpdated.next([ ...this.posts ]);
        this.router.navigate([ '/' ]);
      });
    }

    deletePost(postId: string) {
      return this.http.delete(BACKEND_URL + postId);
    }
  }
