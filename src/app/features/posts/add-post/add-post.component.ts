import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/core/services/post/post.service';
import { IPost } from 'src/app/models/post.model';

@Component({
	selector: 'app-add-post',
	templateUrl: './add-post.component.html',
	styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
	@Output() postAdded: EventEmitter<IPost> = new EventEmitter<IPost>(null);
	isPostFormVisible: boolean;
	postForm: FormGroup;

	constructor(
		private fb: FormBuilder
	) {
		this.postForm = fb.group({
			author: ['', Validators.required],
			title: ['', Validators.required],
		});
	}

	displayPostForm(): void {
		this.isPostFormVisible = true;
	}

	hidePostForm(): void {
		this.isPostFormVisible = false;
	}

	addPost(): void {
		const newPost = this.postForm.value;
		if (this.isPostFormVisible) {
			this.postAdded.emit(newPost);
			this.hidePostForm();
			this.resetPostForm();
		} else {
			this.displayPostForm();
		}
	}

	private resetPostForm(): void {
		this.postForm.reset();
	}

}
