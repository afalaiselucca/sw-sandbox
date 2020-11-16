import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { AppInterceptor } from './interceptors/app.interceptor';
import { PostsModule } from './features/posts/posts.module';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CoreModule,
		PostsModule,
		AppRoutingModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
