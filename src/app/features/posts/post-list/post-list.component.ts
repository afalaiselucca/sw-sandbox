import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IPost } from 'src/app/models/post.model';
import { PostsState } from '../posts.state';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
	posts$: Observable<IPost[]>;
	isLoading$: Observable<boolean>;

	constructor(private postState: PostsState) { }

	ngOnInit(): void {
		this.posts$ = this.postState.onPosts();
		this.isLoading$ = this.postState.isLoading$;
		this.postState.getPosts();
	}

	addPost(post: IPost): void {
		this.postState.addPost(post);
	}

	removePost(post: IPost): void {
		this.postState.removePost(post);
	}
}
