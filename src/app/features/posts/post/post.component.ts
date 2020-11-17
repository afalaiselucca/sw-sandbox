import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPost } from 'src/app/models/post.model';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
})
export class PostComponent {
	@Input() post: IPost;
	@Output() postRemoved: EventEmitter<IPost> = new EventEmitter<IPost>();
	@Output() postEdited: EventEmitter<IPost> = new EventEmitter<IPost>();
	isEditing: boolean;

	get isPostValid(): boolean {
		return !!this.post.author && !!this.post.title;
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
