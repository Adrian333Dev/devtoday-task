import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ICountry, ICountryInfo, IHoliday } from './types';
import { environment as env } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NagerDateService {
  private baseUrl = env.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Fetch all available countries from the Nager.Date API.
   */
  getCountries(): Observable<ICountry[]> {
    return this.http
      .get<ICountry[]>(`${this.baseUrl}/AvailableCountries`)
      .pipe(catchError(this.handleError<ICountry[]>('getCountries', [])));
  }

  /**
   * Fetch public holidays for a specific country and year.
   * @param year - the year for which the holidays are requested
   * @param countryCode - the country code (ISO 3166-1 alpha-2)
   */
  getHolidaysByCountryAndYear(
    year: number,
    countryCode: string
  ): Observable<IHoliday[]> {
    return this.http
      .get<IHoliday[]>(`${this.baseUrl}/PublicHoliday/${year}/${countryCode}`)
      .pipe(
        catchError(
          this.handleError<IHoliday[]>('getHolidaysByCountryAndYear', [])
        )
      );
  }

  /**
   * Fetch the next public holidays worldwide.
   */
  getNextPublicHolidays(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/NextPublicHolidaysWorldwide`)
      .pipe(catchError(this.handleError<any[]>('getNextPublicHolidays', [])));
  }

  /**
   * Fetch the next public holidays for a specific country.
   * @param countryCode - the country code (ISO 3166-1 alpha-2)
   */
  getNextPublicHolidaysByCountry(countryCode: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/NextPublicHolidays/${countryCode}`)
      .pipe(
        catchError(
          this.handleError<any[]>('getNextPublicHolidaysByCountry', [])
        )
      );
  }

  // Fetch country info by country code
  getCountryInfo(countryCode: string): Observable<ICountryInfo> {
    return this.http.get<ICountryInfo>(
      `${this.baseUrl}/CountryInfo/${countryCode}`
    );
  }

  // Fetch holidays by country code and year
  getHolidays(countryCode: string, year: number): Observable<IHoliday[]> {
    return this.http.get<IHoliday[]>(
      `${this.baseUrl}/PublicHolidays/${year}/${countryCode}`
    );
  }

  /**
   * Handle HTTP operation failures.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Return an empty result to keep the app running
      return of(result as T);
    };
  }
}
