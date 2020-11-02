import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'service-worker-sandbox';
	constructor() {
		console.log('Online', navigator.onLine);
	}
}
