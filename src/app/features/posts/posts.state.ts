import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of, forkJoin } from 'rxjs';
import { filter, tap, shareReplay, map, catchError } from 'rxjs/operators';
import { PostService } from 'src/app/core/services/post/post.service';
import { IPost } from 'src/app/models';
import { OnlineStatusService } from 'src/app/core/services/online-status/online-status.service';

@Injectable()
export class PostsState {
	posts$: BehaviorSubject<IPost[]> = new BehaviorSubject([]);
	offlinePosts$: BehaviorSubject<IPost[]> = new BehaviorSubject([]);
	isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	isOnline: boolean;

	constructor(
		private postService: PostService,
		private onlineStatusService: OnlineStatusService,
	) {
		onlineStatusService.onlineChanges$
			.pipe(
				tap((online) => this.isOnline = online),
				filter((online) => !!online)
			)
			.subscribe(() => {
				this.getPosts();
				this.submitOfflinePosts();
			});
	}

	getPosts(): void {
		this.postService.getPosts()
			.subscribe((posts) => this.updatePosts(posts));
	}

	addPost(post: IPost): void {
		if (this.isOnline) {
			const newPostIndex = this.addPostToList(post);
			this.isLoading$.next(true);
			this.postService.addPost(post)
				.subscribe((storedPost) => {
					this.updatePostInList(storedPost, newPostIndex);
					this.isLoading$.next(false);
				});
		} else {
			this.addPostToOfflineList(post);
		}
	}

	editPost(post: IPost, index?: number): void {
		let postIndex: number;
		if (post.id) {
			postIndex = this.getPostIndexById(post);
			this.isLoading$.next(this.isOnline && true);
			this.updatePostInList(post, postIndex);
			this.postService.patchPost(post)
				.subscribe((storedPost) => {
					this.isLoading$.next(false);
					this.updatePostInList(storedPost, postIndex);
				});
		} else {
			const posts = this.posts$.getValue();
			postIndex = index - posts.length;
			this.updatePostInOfflineList(post, postIndex);
		}
	}

	removePost(post: IPost): void {
		if (post.id) {
			this.isLoading$.next(this.isOnline && true);
			this.removePostFromList(post);
			this.postService.deletePost(post.id)
				.subscribe(() => {
					this.removePostFromList(post);
					this.isLoading$.next(false);
				});
		} else {
			this.removePostFromOfflineList(post);
		}
	}

	onPosts(): Observable<IPost[]> {
		return combineLatest([
			this.posts$.pipe(shareReplay(1)),
			this.offlinePosts$.pipe(shareReplay(1))
		])
		.pipe(map(([posts, offlinePosts]) => [...posts, ...offlinePosts]));
	}

	private submitOfflinePosts(): void {
		const posts = this.offlinePosts$.getValue();
		forkJoin(posts.map(post => this.postService.addPost(post)))
			.subscribe(() => {
				this.getPosts();
				this.offlinePosts$.next([]);
			});
	}

	private getPostIndex(post: IPost, list: IPost[]): number {
		const serializedPost = JSON.stringify(post);
		return list.findIndex(searchedPost => JSON.stringify(searchedPost) === serializedPost);
	}

	private getPostIndexById(post: IPost): number {
		const list = this.getLocalPosts();
		return list.findIndex(localPost => localPost.id === post.id);
	}

	private getLocalPosts(): IPost[] {
		return this.posts$.getValue();
	}

	private getLocalOfflinePosts(): IPost[] {
		return this.offlinePosts$.getValue();
	}

	private updatePosts(posts: IPost[]): void {
		this.posts$.next(posts);
	}

	private updateOfflinePosts(posts: IPost[]): void {
		this.offlinePosts$.next(posts);
	}

	private addPostToList(post: IPost): number {
		const posts = this.getLocalPosts();
		const newPostIndex = posts.length;
		posts.push(post);
		this.updatePosts(posts);

		return newPostIndex;
	}

	private addPostToOfflineList(post: IPost): number {
		const posts = this.getLocalOfflinePosts();
		const newPostIndex = posts.length;
		posts.push(post);
		this.updateOfflinePosts(posts);

		return newPostIndex;
	}

	private removePostFromList(post: IPost): void {
		const posts = this.getLocalPosts();
		const postIndex = this.getPostIndex(post, posts);
		if (postIndex !== -1) {
			posts.splice(postIndex, 1);
			this.updatePosts(posts);
		}
	}

	private removePostFromOfflineList(post: IPost): void {
		const posts = this.getLocalOfflinePosts();
		const postIndex = this.getPostIndex(post, posts);
		if (postIndex !== -1) {
			posts.splice(postIndex, 1);
			this.updateOfflinePosts(posts);
		}
	}

	private updatePostInList(post: IPost, index: number): void {
		const posts = this.getLocalPosts();
		posts.splice(index, 1, post);
		this.updatePosts(posts);
	}

	private updatePostInOfflineList(post: IPost, index: number): void {
		const posts = this.getLocalOfflinePosts();
		posts.splice(index, 1, post);
		this.updateOfflinePosts(posts);
	}
}
