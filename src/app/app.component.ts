import { Component } from '@angular/core';
import { WarehouseService } from './services/warehouse.service';
import { DistanceService } from './services/distance.service';
import { DistanceResult } from './models/warehouse.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <div class="animated-background">
        <div class="gradient-sphere sphere-1"></div>
        <div class="gradient-sphere sphere-2"></div>
      </div>

      <mat-progress-bar *ngIf="isLoading" mode="indeterminate" class="top-progress" color="accent"></mat-progress-bar>
      
      <div class="content-wrapper">
        <header class="header" [@fadeIn]>
          <div class="app-icon">
            <mat-icon>location_on</mat-icon>
          </div>
          <h1>Warehouse <span>Distance Finder</span></h1>
          <p class="subtitle">Find your nearest warehouse with precise distance calculation</p>
        </header>

        <div class="scrollable-content">
          <app-zip-code-input 
            (zipCodeSubmit)="onZipCodeSubmit($event)" 
            [isLoading]="isLoading">
          </app-zip-code-input>

          <app-warehouse-list 
            [distanceResults]="distanceResults" 
            [isLoading]="isLoading"
            [originZipCode]="currentZipCode">
          </app-warehouse-list>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      overflow: hidden;
    }

    .app-container {
      height: 100vh;
      background: linear-gradient(135deg, #4A1D96 0%, #6B21A8 100%);
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .animated-background {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
    }

    .gradient-sphere {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.4;
      animation: float 20s infinite ease-in-out;
    }

    .sphere-1 {
      width: 800px;
      height: 800px;
      background: radial-gradient(circle at center, #D946EF 0%, #9333EA 100%);
      top: -300px;
      right: -200px;
      animation-delay: -5s;
    }

    .sphere-2 {
      width: 600px;
      height: 600px;
      background: radial-gradient(circle at center, #A855F7 0%, #6B21A8 100%);
      bottom: -200px;
      left: -100px;
      animation-delay: -10s;
    }

    @keyframes float {
      0%, 100% {
        transform: translate(0, 0);
      }
      50% {
        transform: translate(-50px, 50px);
      }
    }

    .content-wrapper {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 0 16px;
    }

    .header {
      text-align: center;
      padding: 24px 20px;
      flex-shrink: 0;
    }

    .app-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #D946EF 0%, #9333EA 100%);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      box-shadow: 0 20px 40px rgba(217, 70, 239, 0.3);
    }

    .app-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: white;
    }

    h1 {
      font-size: 36px;
      font-weight: 700;
      color: white;
      margin: 0 0 12px;
      line-height: 1.2;
    }

    h1 span {
      display: block;
      color: #F0ABFC;
    }

    .subtitle {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
      font-weight: 400;
      padding: 0 16px;
    }

    .scrollable-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      -webkit-overflow-scrolling: touch;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }

    .scrollable-content::-webkit-scrollbar {
      width: 8px;
    }

    .scrollable-content::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
    }

    .scrollable-content::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }

    .scrollable-content::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 768px) {
      .content-wrapper {
        padding: 0 12px;
      }

      .header {
        padding: 16px 12px;
      }

      .app-icon {
        width: 56px;
        height: 56px;
        margin-bottom: 12px;
      }

      .app-icon mat-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
      }

      h1 {
        font-size: 28px;
        margin-bottom: 8px;
      }

      .subtitle {
        font-size: 16px;
        padding: 0 12px;
      }

      .scrollable-content {
        padding: 16px 12px;
      }

      .sphere-1 {
        width: 400px;
        height: 400px;
      }

      .sphere-2 {
        width: 300px;
        height: 300px;
      }
    }

    @media (max-width: 480px) {
      .content-wrapper {
        padding: 0 8px;
      }

      .header {
        padding: 12px 8px;
      }

      .app-icon {
        width: 48px;
        height: 48px;
        margin-bottom: 8px;
      }

      .app-icon mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }

      h1 {
        font-size: 24px;
        margin-bottom: 6px;
      }

      .subtitle {
        font-size: 14px;
        padding: 0 8px;
      }

      .scrollable-content {
        padding: 12px 8px;
      }

      .sphere-1 {
        width: 300px;
        height: 300px;
      }

      .sphere-2 {
        width: 200px;
        height: 200px;
      }
    }

    @media (max-width: 360px) {
      h1 {
        font-size: 20px;
      }

      .subtitle {
        font-size: 13px;
      }

      .app-icon {
        width: 40px;
        height: 40px;
      }

      .app-icon mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('800ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppComponent {
  distanceResults: DistanceResult[] = [];
  isLoading = false;
  currentZipCode: string = '';

  constructor(
    private warehouseService: WarehouseService,
    private distanceService: DistanceService,
    private snackBar: MatSnackBar
  ) {}

  onZipCodeSubmit(zipCode: string) {
    this.isLoading = true;
    this.currentZipCode = zipCode;
    this.warehouseService.getWarehouses().subscribe(warehouses => {
      this.distanceService.calculateDistance(zipCode, warehouses)
        .subscribe({
          next: (results) => {
            this.distanceResults = results;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error:', error);
            this.isLoading = false;
            this.snackBar.open('Error calculating distances. Please try again.', 'Close', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['error-snackbar']
            });
          }
        });
    });
  }
}
