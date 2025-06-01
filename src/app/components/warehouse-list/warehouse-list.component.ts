import { Component, Input, OnInit } from '@angular/core';
import { DistanceResult, Warehouse } from '../../models/warehouse.model';
import { WarehouseService } from '../../services/warehouse.service';
import { ZipCodeService } from '../../services/zip-code.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-warehouse-list',
  template: `
    <div class="warehouse-list">
      <div class="list-header" *ngIf="distanceResults.length || warehouses.length">
        <mat-icon>location_on</mat-icon>
        <h2>{{ distanceResults.length ? 'Warehouse Distances' : 'Our Warehouses' }}</h2>
      </div>
      
      <div class="loading-container" *ngIf="isLoading" [@fadeIn]>
        <mat-spinner diameter="50" color="accent"></mat-spinner>
        <p>Calculating distances...</p>
      </div>

      <div class="results-container" [@listAnimation]="distanceResults.length || warehouses.length" *ngIf="!isLoading">
        <ng-container *ngIf="distanceResults.length; else defaultList">
          <div *ngFor="let result of distanceResults; let i = index" 
               class="warehouse-card"
               [class.nearest]="i === 0">
            <div class="nearest-badge" *ngIf="i === 0">
              <span>Nearest</span>
            </div>
            <div class="card-header">
              <div class="warehouse-info">
                <h3>{{ result.warehouse.name }}</h3>
                <p class="location">{{ result.warehouse.address }}</p>
              </div>
            </div>
            <div class="card-content">
              <div class="info-row">
                <div class="info-item">
                  <mat-icon>my_location</mat-icon>
                  <div class="info-text">
                    <span class="label">To Location</span>
                    <span class="value">{{ originZipCode }}, {{ getState() }}, USA</span>
                  </div>
                </div>
                <div class="info-item">
                  <mat-icon>directions_car</mat-icon>
                  <div class="info-text">
                    <span class="label">Distance</span>
                    <span class="value">{{ result.distance.toFixed(1) }} miles</span>
                  </div>
                </div>
                <div class="info-item">
                  <mat-icon>schedule</mat-icon>
                  <div class="info-text">
                    <span class="label">Duration</span>
                    <span class="value">{{ result.duration }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ng-container>

        <ng-template #defaultList>
          <div *ngFor="let warehouse of warehouses" 
               class="warehouse-card">
            <div class="card-header">
              <div class="warehouse-info">
                <h3>{{ warehouse.name }}</h3>
                <p class="location">{{ warehouse.address }}</p>
              </div>
            </div>
            <div class="card-content">
              <div class="info-row">
                <div class="info-item info-item-default">
                  <mat-icon>warehouse</mat-icon>
                  <div class="info-text">
                    <span class="value">Enter your zip code above to calculate distance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .warehouse-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .list-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(40px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 12px 24px;
      margin-bottom: 4px;
      width: fit-content;
      margin: 0 auto;
    }

    .list-header mat-icon {
      color: #D946EF;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .list-header h2 {
      margin: 0;
      font-size: 20px;
      color: white;
      font-weight: 600;
    }

    .loading-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      min-height: 200px;
    }

    .loading-container p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 16px;
    }

    .results-container {
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      width: 100%;
    }

    .warehouse-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(40px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      transition: all 0.3s ease;
      width: 100%;
    }

    .warehouse-card:hover {
      transform: translateY(-4px);
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(217, 70, 239, 0.2);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .nearest {
      background: linear-gradient(135deg, rgba(217, 70, 239, 0.15), rgba(147, 51, 234, 0.15));
      border-color: rgba(217, 70, 239, 0.3);
    }

    .nearest:hover {
      background: linear-gradient(135deg, rgba(217, 70, 239, 0.2), rgba(147, 51, 234, 0.2));
      border-color: rgba(217, 70, 239, 0.4);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
    }

    .nearest-badge {
      position: absolute;
      top: 12px;
      right: -30px;
      background: linear-gradient(135deg, #D946EF, #9333EA);
      color: white;
      padding: 4px 32px;
      transform: rotate(45deg);
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 4px 12px rgba(217, 70, 239, 0.3);
    }

    .card-header {
      padding: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .warehouse-info h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: white;
      margin-bottom: 4px;
    }

    .location {
      margin: 0;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
    }

    .card-content {
      padding: 20px;
    }

    .info-row {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      transition: all 0.3s ease;
    }

    .info-item:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(217, 70, 239, 0.2);
    }

    .info-item mat-icon {
      color: #D946EF;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .info-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .label {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value {
      font-size: 14px;
      color: white;
      font-weight: 500;
    }

    .info-item-default {
      background: rgba(217, 70, 239, 0.05);
      border-color: rgba(217, 70, 239, 0.1);
    }

    .info-item-default:hover {
      background: rgba(217, 70, 239, 0.08);
      border-color: rgba(217, 70, 239, 0.2);
    }

    @media (max-width: 768px) {
      .warehouse-list {
        gap: 16px;
      }

      .list-header {
        padding: 10px 20px;
      }

      .list-header h2 {
        font-size: 18px;
      }

      .results-container {
        gap: 12px;
        grid-template-columns: 1fr;
      }

      .warehouse-card {
        border-radius: 16px;
        margin: 0 auto;
        max-width: 500px;
      }

      .card-header {
        padding: 16px;
      }

      .card-content {
        padding: 16px;
      }

      .info-row {
        gap: 10px;
      }

      .info-item {
        padding: 10px;
      }

      .nearest-badge {
        font-size: 10px;
        padding: 3px 28px;
        right: -28px;
        top: 10px;
      }
    }

    @media (max-width: 480px) {
      .warehouse-list {
        gap: 12px;
      }

      .list-header {
        padding: 8px 16px;
        width: 90%;
      }

      .list-header h2 {
        font-size: 16px;
      }

      .list-header mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .warehouse-card {
        border-radius: 14px;
      }

      .card-header {
        padding: 14px;
      }

      .warehouse-info h3 {
        font-size: 16px;
      }

      .location {
        font-size: 13px;
      }

      .card-content {
        padding: 14px;
      }

      .info-item {
        padding: 10px;
      }

      .info-text {
        gap: 1px;
      }

      .label {
        font-size: 11px;
      }

      .value {
        font-size: 13px;
      }

      .nearest-badge {
        font-size: 9px;
        padding: 2px 24px;
        right: -26px;
        top: 8px;
      }
    }

    @media (max-width: 360px) {
      .list-header {
        padding: 8px 12px;
        width: 95%;
      }

      .list-header h2 {
        font-size: 15px;
      }

      .list-header mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      .warehouse-info h3 {
        font-size: 15px;
      }

      .location {
        font-size: 12px;
      }

      .info-item {
        padding: 8px;
      }

      .info-item mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      .label {
        font-size: 10px;
      }

      .value {
        font-size: 12px;
      }
    }
  `],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(12px)' }),
          stagger(80, [
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class WarehouseListComponent implements OnInit {
  @Input() distanceResults: DistanceResult[] = [];
  @Input() isLoading = false;
  @Input() originZipCode: string = '';
  warehouses: Warehouse[] = [];

  constructor(
    private warehouseService: WarehouseService,
    private zipCodeService: ZipCodeService
  ) {}

  ngOnInit() {
    this.loadWarehouses();
  }

  private loadWarehouses() {
    this.warehouseService.getWarehouses().subscribe(warehouses => {
      this.warehouses = warehouses;
    });
  }

  getState(): string {
    return this.zipCodeService.getStateFromZipCode(this.originZipCode);
  }
} 