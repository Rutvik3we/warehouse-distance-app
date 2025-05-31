import { Component, OnInit } from '@angular/core';
import { WarehouseService } from './services/warehouse.service';
import { DistanceService } from './services/distance.service';
import { DistanceResult } from './models/warehouse.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <mat-progress-bar *ngIf="isLoading" mode="indeterminate" color="accent"></mat-progress-bar>
      <div class="header">
        <h1>Warehouse Distance Calculator</h1>
        <p class="subtitle">Find the nearest warehouse to your location</p>
      </div>
      <app-zip-code-input (zipCodeSubmit)="onZipCodeSubmit($event)" [isLoading]="isLoading"></app-zip-code-input>
      <app-warehouse-list [distanceResults]="distanceResults" [isLoading]="isLoading"></app-warehouse-list>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    .header {
      text-align: center;
      padding: 40px 0;
      color: #2c3e50;
    }
    h1 {
      margin: 0;
      font-size: 2.5em;
      font-weight: 700;
      margin-bottom: 10px;
      background: linear-gradient(45deg, #2c3e50, #3498db);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    }
    .subtitle {
      font-size: 1.2em;
      color: #34495e;
      margin: 0;
      opacity: 0.8;
    }
    mat-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
  `]
})
export class AppComponent implements OnInit {
  distanceResults: DistanceResult[] = [];
  isLoading = false;

  constructor(
    private warehouseService: WarehouseService,
    private distanceService: DistanceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.distanceResults = [];
  }

  onZipCodeSubmit(zipCode: string) {
    this.isLoading = true;
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
