import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPost } from 'src/app/models/post.model';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
})
export class PostComponent {
	@Input() post: IPost;
	@Output() postRemoved: EventEmitter<IPost> = new EventEmitter<IPost>();

	constructor() { }

	removePost(): void {
		this.postRemoved.emit(this.post);
	}

}
