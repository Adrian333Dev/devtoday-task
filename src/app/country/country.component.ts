import { Component, OnInit, signal } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NagerDateService } from '../country.service';

@Component({
  selector: 'country',
  standalone: true,
  imports: [
    CommonModule,

    // Angular Material
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryPage implements OnInit {
  countryCode: string = '';
  holidays = signal<any[]>([]);
  selectedYear = signal<number>(new Date().getFullYear());

  years = Array.from({ length: 11 }, (_, i) => 2020 + i); // Generate years 2020-2030

  constructor(
    private route: ActivatedRoute,
    private nagerDateService: NagerDateService
  ) {}

  ngOnInit(): void {
    this.countryCode = this.route.snapshot.paramMap.get('countryCode') || '';
    this.fetchHolidays(this.selectedYear());
  }

  fetchHolidays(year: number): void {
    this.nagerDateService
      .getHolidaysByCountryAndYear(year, this.countryCode)
      .subscribe((holidays) => this.holidays.set(holidays));
  }

  onYearChange(year: number): void {
    this.selectedYear.set(year);
    this.fetchHolidays(year);
  }
}
