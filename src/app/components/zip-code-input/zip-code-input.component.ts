import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-zip-code-input',
  template: `
    <div class="input-section">
      <h1>Find your nearest warehouse with precise distance calculation</h1>
      
      <div class="input-container">
        <h2>Enter Your Location</h2>
        <p class="subtitle">Get distances to all warehouses</p>
        
        <div class="input-group">
          <div class="input-wrapper">
            <mat-icon>location_on</mat-icon>
            <input 
              [formControl]="zipCode"
              type="text" 
              placeholder="Enter zip code"
              [class.error]="zipCode.invalid && zipCode.touched"
            >
          </div>

          <button 
            (click)="onSubmit()"
            [disabled]="zipCode.invalid || isLoading"
            class="submit-button"
          >
            <mat-icon>calculate</mat-icon>
            Calculate Distances
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .input-section {
      text-align: center;
      margin-bottom: 40px;
    }

    h1 {
      color: white;
      font-size: 24px;
      font-weight: 500;
      margin: 0 0 32px;
      opacity: 0.9;
    }

    .input-container {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 24px;
      max-width: 600px;
      margin: 0 auto;
    }

    h2 {
      color: white;
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 8px;
    }

    .subtitle {
      color: rgba(255, 255, 255, 0.7);
      font-size: 16px;
      margin: 0 0 24px;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .input-wrapper {
      position: relative;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      overflow: hidden;
    }

    mat-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(255, 255, 255, 0.7);
    }

    input {
      width: 100%;
      padding: 16px 16px 16px 48px;
      background: transparent;
      border: none;
      color: white;
      font-size: 16px;
    }

    input:focus {
      outline: none;
    }

    input::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    .submit-button {
      background: linear-gradient(135deg, #D946EF 0%, #9333EA 100%);
      color: white;
      border: none;
      border-radius: 12px;
      padding: 16px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .submit-button:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    .submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .submit-button mat-icon {
      position: static;
      transform: none;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 20px;
        margin-bottom: 24px;
        padding: 0 16px;
      }

      .input-container {
        margin: 0 16px;
        padding: 20px;
      }

      h2 {
        font-size: 20px;
      }

      .subtitle {
        font-size: 14px;
        margin-bottom: 20px;
      }

      input {
        padding: 14px 14px 14px 44px;
      }

      .submit-button {
        padding: 14px;
      }
    }

    @media (max-width: 480px) {
      h1 {
        font-size: 18px;
        margin-bottom: 20px;
      }

      .input-container {
        padding: 16px;
      }

      h2 {
        font-size: 18px;
      }

      .subtitle {
        font-size: 13px;
        margin-bottom: 16px;
      }

      input {
        padding: 12px 12px 12px 40px;
        font-size: 14px;
      }

      .submit-button {
        padding: 12px;
        font-size: 14px;
      }
    }
  `]
})
export class ZipCodeInputComponent {
  @Output() zipCodeSubmit = new EventEmitter<string>();
  @Input() isLoading = false;

  zipCode = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d{5}$/)
  ]);

  onSubmit() {
    if (this.zipCode.valid && !this.isLoading) {
      const value = this.zipCode.value;
      if (value) {
        this.zipCodeSubmit.emit(value);
      }
    }
  }
} 