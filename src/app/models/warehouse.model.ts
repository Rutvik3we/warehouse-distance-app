export interface Warehouse {
  id: number;
  name: string;
  zipCode: string;
  address: string;
}

export interface DistanceResult {
  warehouse: Warehouse;
  distance: number;
  duration: string;
} 