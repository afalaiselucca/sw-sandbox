import { Component, OnDestroy, OnInit } from '@angular/core';
import { UpdateAvailableEvent } from '@angular/service-worker';
import { Subscription } from 'rxjs';

import { UpdateService } from '../../services';

@Component({
	// tslint:disable-next-line:component-selector
	selector: '[app-update]',
	templateUrl: './update.component.html',
	styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, OnDestroy {
	hasAvailableUpdate: boolean | UpdateAvailableEvent;
	subscription: Subscription;

	constructor(
		private updateService: UpdateService,
	) { }

	ngOnInit(): void {
		this.subscription = this.updateService.onAvailableUpdate()
			.subscribe((hasAvailableUpdate) => this.hasAvailableUpdate = hasAvailableUpdate);
	}

	activateUpdate(): void {
		this.updateService.activateUpdate();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
