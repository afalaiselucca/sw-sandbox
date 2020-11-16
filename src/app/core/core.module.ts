import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
	NavigationComponent,
	OnlineStatusComponent,
	UpdateComponent,
} from './components';
import { UpdateService } from './services';
import { PostService } from './services/post/post.service';
import { OnlineStatusService } from './services/online-status/online-status.service';

@NgModule({
	declarations: [
		NavigationComponent,
		UpdateComponent,
		OnlineStatusComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		MatSnackBarModule,
	],
	exports: [
		NavigationComponent,
		UpdateComponent,
		OnlineStatusComponent,
	],
	providers: [
		UpdateService,
		PostService,
		OnlineStatusService,
	],
})
export class CoreModule { }
