import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { UpdateComponent } from './update/update.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OnlineStatusComponent } from './online-status/online-status.component';

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
})
export class CoreModule { }
