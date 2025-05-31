import { Component, Input } from '@angular/core';
import { DistanceResult } from '../../models/warehouse.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-warehouse-list',
  template: `
    <div class="warehouse-list">
      <h2 *ngIf="distanceResults.length || isLoading">Warehouse Distances</h2>
      
      <div class="loading-container" *ngIf="isLoading">
        <mat-spinner diameter="50"></mat-spinner>
        <p>Calculating distances...</p>
      </div>

      <div class="results-container" [@listAnimation]="'in'" *ngIf="!isLoading">
        <mat-card *ngFor="let result of distanceResults; let i = index" 
                  [class.nearest]="i === 0"
                  class="warehouse-card">
        <mat-card-header>
            <mat-icon mat-card-avatar [class.nearest-icon]="i === 0">
              {{ i === 0 ? 'star' : 'warehouse' }}
            </mat-icon>
          <mat-card-title>{{ result.warehouse.name }}</mat-card-title>
          <mat-card-subtitle>{{ result.warehouse.address }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
            <div class="distance-info">
              <div class="info-item">
                <mat-icon>directions_car</mat-icon>
                <span>{{ result.distance.toFixed(1) }} miles</span>
              </div>
              <div class="info-item">
                <mat-icon>schedule</mat-icon>
                <span>{{ result.duration }}</span>
              </div>
            </div>
        </mat-card-content>
      </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .warehouse-list {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }
    h2 {
      margin-bottom: 20px;
      color: #2c3e50;
      font-size: 1.8em;
      text-align: center;
    }
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 40px 0;
    }
    .loading-container p {
      color: #666;
      font-size: 1.1em;
    }
    .results-container {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    .warehouse-card {
      background: white;
      border-radius: 10px;
      transition: all 0.3s ease;
      border: none;
    }
    .warehouse-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }
    .nearest {
      border: none;
      background: linear-gradient(135deg, #a8e063 0%, #56ab2f 100%);
      color: white;
    }
    .nearest mat-card-title,
    .nearest mat-card-subtitle,
    .nearest .info-item {
      color: white;
    }
    .nearest-icon {
      color: #ffd700;
    }
    .distance-info {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .info-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
    }
    .nearest .info-item mat-icon {
      color: rgba(255,255,255,0.9);
    }
  `],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class WarehouseListComponent {
  @Input() distanceResults: DistanceResult[] = [];
  @Input() isLoading = false;
} 