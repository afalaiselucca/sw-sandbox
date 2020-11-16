import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostsState } from './posts.state';

@NgModule({
	declarations: [
		PostComponent,
		PostListComponent,
		AddPostComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [
		PostListComponent,
	],
	providers: [
		PostsState,
	]
})
export class PostsModule { }
