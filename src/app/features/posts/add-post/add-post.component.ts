import { Component, Output, EventEmitter } from '@angular/core';

import { IPost } from '@models/index';

@Component({
	selector: 'app-add-post',
	templateUrl: './add-post.component.html',
	styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
	@Output() postAdded: EventEmitter<IPost> = new EventEmitter<IPost>(null);
	isPostFormVisible: boolean;
	newPost: IPost;

	get postFormValid(): boolean {
		return !!this.newPost?.author && !!this.newPost?.title;
	}

	displayPostForm(): void {
		this.isPostFormVisible = true;
	}

	hidePostForm(): void {
		this.isPostFormVisible = false;
	}

	addPost(): void {
		if (this.isPostFormVisible) {
			this.postAdded.emit(this.newPost);
			this.hidePostForm();
			this.resetPostForm();
		} else {
			this.displayPostForm();
		}
	}

	private resetPostForm(): void {
		this.newPost = null;
	}

}
