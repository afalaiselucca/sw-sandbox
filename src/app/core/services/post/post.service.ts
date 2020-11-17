import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LOCAL_API } from 'src/app/constants';
import { IPost } from 'src/app/models';

@Injectable()
export class PostService {
	private postUrl = `${LOCAL_API}/posts`;

	constructor(private http: HttpClient) { }

	getPosts(): Observable<IPost[]> {
		return this.http.get<IPost[]>(this.postUrl);
	}

	getPostById(postId: number): Observable<IPost> {
		return this.http.get<IPost>(`${this.postUrl}/${postId}`);
	}

	addPost(post: IPost): Observable<IPost> {
		return this.http.post<IPost>(this.postUrl, post);
	}

	patchPost(post: IPost): Observable<IPost> {
		return this.http.patch<IPost>(`${this.postUrl}/${post.id}`, post);
	}

	deletePost(postId: number): Observable<void> {
		return this.http.delete<void>(`${this.postUrl}/${postId}`);
	}
}
