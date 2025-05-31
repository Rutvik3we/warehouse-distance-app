import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-zip-code-input',
  template: `
    <div class="zip-code-container">
      <form [formGroup]="zipCodeForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" class="zip-input">
          <mat-label>Enter your zip code</mat-label>
          <input matInput formControlName="zipCode" placeholder="e.g., 12345" [readonly]="isLoading">
          <mat-icon matPrefix>location_on</mat-icon>
          <mat-error *ngIf="zipCodeForm.get('zipCode')?.hasError('required')">
            Zip code is required
          </mat-error>
          <mat-error *ngIf="zipCodeForm.get('zipCode')?.hasError('pattern')">
            Please enter a valid 5-digit zip code
          </mat-error>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" 
                [disabled]="!zipCodeForm.valid || isLoading"
                class="submit-button">
          <mat-spinner diameter="20" *ngIf="isLoading" class="spinner"></mat-spinner>
          <span *ngIf="!isLoading">Find Nearest Warehouse</span>
          <span *ngIf="isLoading">Calculating...</span>
        </button>
      </form>
    </div>
  `,
  styles: [`
    .zip-code-container {
      max-width: 400px;
      margin: 20px auto;
      padding: 20px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }
    .zip-code-container:hover {
      transform: translateY(-5px);
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .zip-input {
      width: 100%;
    }
    .submit-button {
      height: 48px;
      font-size: 1.1em;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.3s ease;
      position: relative;
    }
    .submit-button:not([disabled]):hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .spinner {
      margin-right: 8px;
      display: inline-block;
      vertical-align: middle;
    }
  `]
})
export class ZipCodeInputComponent {
  @Output() zipCodeSubmit = new EventEmitter<string>();
  @Input() isLoading = false;
  zipCodeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.zipCodeForm = this.fb.group({
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });
  }

  onSubmit() {
    if (this.zipCodeForm.valid) {
      this.zipCodeSubmit.emit(this.zipCodeForm.get('zipCode')?.value);
    }
  }
} 