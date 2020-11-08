import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
	NavigationComponent,
	OnlineStatusComponent,
	UpdateComponent,
} from './components';
import { UpdateService } from './services';

@NgModule({
	declarations: [
		NavigationComponent,
		UpdateComponent,
		OnlineStatusComponent,
	],
	imports: [
		CommonModule,
		MatSnackBarModule,
	],
	exports: [
		NavigationComponent,
		UpdateComponent,
		OnlineStatusComponent,
	],
	providers: [
		UpdateService,
	],
})
export class CoreModule { }
