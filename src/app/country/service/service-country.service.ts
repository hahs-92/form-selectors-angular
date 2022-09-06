import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';

//interfaces
import { SmallCountry, Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class ServiceCountryService {
  private baseUrl = 'https://restcountries.com/v2';

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

  constructor(private http: HttpClient) {}

  getCountriesByRegion(region: string): Observable<SmallCountry[]> {
    return this.http.get<SmallCountry[]>(
      `${this.baseUrl}/region/${region}?fields=alpha3Code&fields=name`
    );
  }

  getCountriesByCode(code: string): Observable<Country | null> {
    if (!code) {
      return of(null);
    }

    return this.http.get<Country>(`${this.baseUrl}/alpha/${code}`);
  }

  getSmallCountryByCode(code: string): Observable<Country> {
    return this.http.get<Country>(
      `${this.baseUrl}/alpha/${code}?fileds=alpha3Code;name`
    );
  }

  getCountriesByBorders(borders: string[]) {
    if (!borders) {
      return of([]);
    }

    const requests: Observable<SmallCountry>[] = [];

    borders.forEach((code) => {
      const request = this.getSmallCountryByCode(code);
      requests.push(request);
    });

    return combineLatest(requests);
    //regresa un observable que contiene un arreglo con las peticiones resueltas
  }
}
