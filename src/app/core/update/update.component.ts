import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { take } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
	selector: '[app-update]',
	templateUrl: './update.component.html',
	styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
	updateSnack: MatSnackBarRef<TextOnlySnackBar>;
	hasAvailableUpdate: boolean;

	constructor(
		private snack: MatSnackBar,
		private swService: SwUpdate,
	) { }

	ngOnInit(): void {
		if (this.swService.isEnabled) {
			this.swService.available.subscribe(() => {
				this.generateSnack('Une nouvelle version est disponible', 'Activer');
				this.hasAvailableUpdate = true;
			});
			interval(1000).subscribe(() => this.swService.checkForUpdate());
		}
	}

	generateSnack(message: string, actionLabel: string): void {
		this.updateSnack = this.snack.open(message, actionLabel);
		this.updateSnack.onAction()
			.pipe(take(1))
			.subscribe(() => this.activateUpdate());
	}

	activateUpdate(): void {
		this.swService.activateUpdate()
			.then(() => {
				this.hasAvailableUpdate = false;
				this.updateSnack = null;
				location.reload();
			})
			.catch(() => {
				this.generateSnack('Erreur lors de la mise à jour', 'Réessayer');
			});
	}

}
