import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warehouse, DistanceResult } from '../models/warehouse.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {
  private readonly API_KEY = environment.googleMapsApiKey;
  private readonly BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log('Using API URL:', this.BASE_URL);
  }

  calculateDistance(userZipCode: string, warehouses: Warehouse[]): Observable<DistanceResult[]> {
    const destinations = warehouses.map(w => w.zipCode).join('|');
    const url = `${this.BASE_URL}?origins=${userZipCode}&destinations=${destinations}&key=${this.API_KEY}`;

    console.log('Making request to:', url);

    return this.http.get(url).pipe(
      map((response: any) => {
        if (response.status !== 'OK') {
          throw new Error('Failed to get distance data');
        }

        return warehouses.map((warehouse, index) => {
          const element = response.rows[0].elements[index];
          return {
            warehouse,
            distance: element.distance.value / 1609.34, // Convert meters to miles
            duration: element.duration.text
          };
        }).sort((a, b) => a.distance - b.distance);
      }),
      catchError(error => {
        console.error('Error calculating distances:', error);
        throw error;
      })
    );
  }
} 