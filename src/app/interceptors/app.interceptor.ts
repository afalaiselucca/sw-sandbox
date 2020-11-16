import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, fromEvent, throwError } from 'rxjs';
import { mapTo, retryWhen, switchMap } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
	private onlineChanges$ = fromEvent(window, 'online').pipe(mapTo(true));
	requests: HttpRequest<any>[];

	get isOnline(): boolean {
		return navigator.onLine;
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			retryWhen((errors) => {
				if (this.isOnline) {
					return errors.pipe(switchMap(err => throwError(err)));
				}
				return this.onlineChanges$;
			})
		);
	}
}
