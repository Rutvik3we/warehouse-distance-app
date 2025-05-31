import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Warehouse, DistanceResult } from '../models/warehouse.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {
  private readonly API_KEY = 'AIzaSyBl_7FSEUCBqFTG4M5n9YceS5tGeGF_UhM';
  private readonly BASE_URL = this.getBaseUrl();

  constructor(private http: HttpClient) {
    console.log('Using API URL:', this.BASE_URL);
  }

  private getBaseUrl(): string {
    const hostname = window.location.hostname;
    if (hostname.includes('cloudworkstations.dev')) {
      // Replace 4200 with 8080 in the URL for Firebase Studio
      return window.location.href
        .replace('4200', '8080')
        .replace(/\/$/, '') // Remove trailing slash if present
        .replace(/\/[^/]*$/, '') // Remove any path
        + '/api/distance';
    }
    return 'http://localhost:8080/api/distance';
  }

  calculateDistance(userZipCode: string, warehouses: Warehouse[]): Observable<DistanceResult[]> {
    const destinations = warehouses.map(w => w.zipCode).join('|');
    const url = `${this.BASE_URL}?origins=${userZipCode}&destinations=${destinations}&key=${this.API_KEY}`;

    console.log('Making request to:', url);

    return this.http.get(url, { 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true
    }).pipe(
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