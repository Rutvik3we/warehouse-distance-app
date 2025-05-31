import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Warehouse } from '../models/warehouse.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private warehouses: Warehouse[] = [
    { id: 1, name: 'Warehouse 1', zipCode: '95131', address: 'San Jose, CA' },
    { id: 2, name: 'Warehouse 2', zipCode: '32220', address: 'Jacksonville, FL' },
    { id: 3, name: 'Warehouse 3', zipCode: '07305', address: 'Jersey City, NJ' },
    { id: 4, name: 'Warehouse 4', zipCode: '75050', address: 'Dallas, TX' }
  ];

  private warehousesSubject = new BehaviorSubject<Warehouse[]>(this.warehouses);

  constructor() { }

  getWarehouses(): Observable<Warehouse[]> {
    return this.warehousesSubject.asObservable();
  }

  getWarehouseByZipCode(zipCode: string): Warehouse | undefined {
    return this.warehouses.find(w => w.zipCode === zipCode);
  }
} 