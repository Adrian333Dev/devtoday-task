import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ICountry } from '../types';
import { NagerDateService } from '../country.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,

    // Angular Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePageComponent implements OnInit {
  // Signals to manage state
  countries = signal<ICountry[]>([]);
  searchQuery = signal<string>('');
  filteredCountries = computed(() =>
    this.countries().filter((country) => country.name.toLowerCase().includes(this.searchQuery().toLowerCase()))
  );

  randomCountries = signal<ICountry[]>([]);

  constructor(private nagerDateService: NagerDateService) {
    // Effect to reactively log or update something when countries or search changes
    effect(() => {
      if (this.searchQuery()) {
        console.log(`Searching for: ${this.searchQuery()}`);
      }
    });
  }

  ngOnInit(): void {
    // Fetch available countries from the service and update state
    this.nagerDateService.getCountries().subscribe((countries) => {
      console.log(countries);
      this.countries.set(countries);
    });
    this.fetchRandomCountries();
  }

  fetchRandomCountries(): void {
    // Random countries logic
    this.nagerDateService.getCountries().subscribe((countries) => {
      const random = this.getRandomItems(countries, 3);
      this.randomCountries.set(random);

      random.forEach((country) => {
        this.nagerDateService.getNextPublicHolidaysByCountry(country.countryCode).subscribe((holidays) => {
          country.nextHoliday = holidays[0]; // Set the first holiday for display
        });
      });
    });
  }

  getRandomItems<T>(arr: T[], count: number): T[] {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Update searchQuery signal on user input
  onSearch(event: Event): void {
    this.searchQuery.set((event?.target as HTMLInputElement).value);
  }
}
