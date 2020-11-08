import { Component, HostListener, OnInit } from '@angular/core';

@Component({
	selector: 'app-online-status',
	templateUrl: './online-status.component.html',
	styleUrls: ['./online-status.component.scss'],
})
export class OnlineStatusComponent implements OnInit {
	isOnline: boolean;
	@HostListener('window:online')
	@HostListener('window:offline')
	setOnlineStatus(): void {
		this.isOnline = navigator.onLine;
	}

	ngOnInit(): void {
		const nativeFetch = window.fetch;
		window.fetch = (...args) => {
			console.log('Detected fetch call');
			return nativeFetch.apply(window, args);
		};
		this.setOnlineStatus();
	}
}
