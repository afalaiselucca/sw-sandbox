import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { interval, Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { DURATION_INTERVAL_CHECK_UPDATES } from '../../../constants';

@Injectable()
export class UpdateService {
	private updateSnack: MatSnackBarRef<TextOnlySnackBar>;
	private hasAvailableUpdate: Observable<boolean | UpdateAvailableEvent> = of(false);

	constructor(
		private snack: MatSnackBar,
		private swUpdate: SwUpdate,
	) {
		if (swUpdate.isEnabled) {
			this.hasAvailableUpdate = this.swUpdate.available
				.pipe(
					tap(() => this.generateSnack('Une nouvelle version est disponible', 'Activer'))
				);
			this.checkForUpdates();
		}
	}

	onAvailableUpdate(): Observable<boolean | UpdateAvailableEvent> {
		return this.hasAvailableUpdate;
	}

	activateUpdate(): void {
		this.swUpdate.activateUpdate()
			.then(() => {
				this.updateSnack = null;
				location.reload();
			})
			.catch(() => {
				this.generateSnack('Erreur lors de la mise à jour', 'Réessayer');
			});
	}

	private checkForUpdates(): void {
		interval(DURATION_INTERVAL_CHECK_UPDATES).subscribe(() => this.swUpdate.checkForUpdate());
	}

	private generateSnack(message: string, actionLabel: string): void {
		this.updateSnack = this.snack.open(message, actionLabel);
		this.updateSnack.onAction()
			.pipe(take(1))
			.subscribe(() => this.activateUpdate());
	}

}
