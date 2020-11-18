import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OnlineStatusService } from '../../services/online-status/online-status.service';

@Component({
	selector: 'app-online-status',
	templateUrl: './online-status.component.html',
	styleUrls: ['./online-status.component.scss'],
})
export class OnlineStatusComponent {
	isOnline$: Observable<boolean> = this.onlineStatusService.onlineChanges$;

	constructor(private onlineStatusService: OnlineStatusService) {}
}
