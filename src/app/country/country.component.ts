import { Component, OnInit, signal } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NagerDateService } from '../country.service';
import { ICountryInfo, IHoliday } from '../types';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    CommonModule,

    // Angular Material
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSelectModule,
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryPageComponent implements OnInit {
  countryCode = signal<string | null>(null);
  countryInfo = signal<ICountryInfo | null>(null);
  holidays = signal<IHoliday[] | null>(null);
  currentYear = signal<number>(new Date().getFullYear());
  yearsRange = Array.from({ length: 11 }, (_, i) => 2020 + i);

  constructor(
    private route: ActivatedRoute,
    private nagerDateService: NagerDateService
  ) {}

  ngOnInit(): void {
    this.countryCode.set(this.route.snapshot.paramMap.get('countryCode'));

    if (this.countryCode()) {
      this.loadCountryInfo(this.countryCode()!);
      this.loadHolidays(this.countryCode()!, this.currentYear());
    }
  }

  loadCountryInfo(countryCode: string): void {
    this.nagerDateService.getCountryInfo(countryCode).subscribe({
      next: (info) => this.countryInfo.set(info),
      error: (err) => console.error('Error fetching country info:', err),
    });
  }

  loadHolidays(countryCode: string, year: number): void {
    this.nagerDateService.getHolidays(countryCode, year).subscribe({
      next: (holidays) => this.holidays.set(holidays),
      error: (err) => console.error('Error fetching holidays:', err),
    });
  }

  onYearChange(year: number): void {
    this.currentYear.set(year);
    this.loadHolidays(this.countryCode()!, year);
  }
}
