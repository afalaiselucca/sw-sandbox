import { Component, OnInit, OnDestroy, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IPost } from '@models/index';

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => PostFormComponent),
		multi: true,
	}],
})
export class PostFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
	@Output() hide: EventEmitter<void> = new EventEmitter();
	postForm: FormGroup;
	val: IPost;
	subscription: Subscription;

	get value(): IPost {
		return this.val;
	}
	set value(v: IPost) {
		this.val = v;
		this.onChange(v);
	}

	constructor(private fb: FormBuilder) { }

	ngOnInit(): void {
		this.postForm = this.fb.group({
			author: ['', Validators.required],
			title: ['', Validators.required],
			id: [],
		});
		this.subscription = this.postForm.valueChanges.subscribe((value) => this.onChange(value));
	}

	onChange = (_) => {};
	onTouched = () => {};

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	writeValue(value: IPost): void {
		if (value) {
			this.postForm.patchValue(value);
		}
	}

	hidePostForm(): void {
		this.hide.emit();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
