import { Injectable } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { mapTo, startWith } from 'rxjs/operators';

@Injectable()
export class OnlineStatusService {
	online$ = fromEvent(window, 'online').pipe(mapTo(true));
	offline$ = fromEvent(window, 'offline').pipe(mapTo(false));
	onlineChanges$ = merge(this.online$, this.offline$).pipe(startWith(true));
}
