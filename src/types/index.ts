export type Locale = 'ka' | 'en' | 'ru';

export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';
export type Transmission = 'automatic' | 'manual';
export type CarType = 'rent' | 'sale' | 'both';
export type CarStatus = 'available' | 'rented' | 'sold';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  rentalPricePerDay: number;
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  location: string;
  images: string[];
  description: string;
  status: CarStatus;
  type: CarType;
  providerId: string;
  providerName: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'provider';
  avatar?: string;
}

export interface CarFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: FuelType;
  transmission?: Transmission;
  type?: CarType;
  location?: string;
}
