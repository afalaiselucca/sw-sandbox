import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPost } from '@models/index';
import { PostsState } from '../posts.state';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
	@Input() post: IPost;
	@Output() postRemoved: EventEmitter<IPost> = new EventEmitter<IPost>();
	@Output() postEdited: EventEmitter<IPost> = new EventEmitter<IPost>();
	isEditing: boolean;
	isPending$: Observable<boolean>;

	get isPostValid(): boolean {
		return !!this.post.author && !!this.post.title;
	}

	constructor(private state: PostsState) {}

	ngOnInit(): void {
		this.isPending$ = this.state.isLoading$.pipe(map(loading => loading && !this.post.id));
	}

	editPost(): void {
		if (this.isEditing && this.isPostValid) {
			this.postEdited.emit(this.post);
		}
		this.isEditing = true;
	}

	removePost(): void {
		this.postRemoved.emit(this.post);
	}

}
