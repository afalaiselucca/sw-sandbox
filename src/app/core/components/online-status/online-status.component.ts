import { Component } from '@angular/core';
import { OnlineStatusService } from '../../services/online-status/online-status.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-online-status',
	templateUrl: './online-status.component.html',
	styleUrls: ['./online-status.component.scss'],
})
export class OnlineStatusComponent {
	isOnline$: Observable<boolean>;

	constructor(private onlineStatusService: OnlineStatusService) {
		this.isOnline$ = onlineStatusService.onlineChanges$;
	}
}
