import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceCountryService {
  private _regions: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  constructor() {}
}
