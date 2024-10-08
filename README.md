# DevToday Assessment App

## Overview

This project is an Angular application that allows users to view country-specific holidays using the Nager.Date API. Users can search for countries, view details about them, and see the upcoming holidays.

### Features

- **Country Search**: Search for countries and view their official name, region, and bordering countries.
- **Holiday List**: View a list of holidays for a selected country and year.
- **Year Selection**: Switch between different years (2020-2030) to view holiday data.
- **Random Countries Widget**: Shows holidays from random countries.

### Libraries and Tools

- **Angular Material**: For UI components.
- **Bootstrap**: For responsive layout.
- **RxJS**: For reactive programming.
- **Nager.Date API**: For fetching country and holiday data.

## Installation

To set up this project locally:

1. Clone the repository:

```bash
git clone https://github.com/Adrian333Dev/devtoday-task.git
cd your-repo
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the application:

```bash
ng serve
```

## Linting and Formatting

1. Check for linting errors:

```bash
ng lint
```

2. Fix linting errors:

```bash
ng lint --fix
```

3. Format code:

```bash
pnpm run format
```

## Important Notes

- Angular has built in environment configuration features, so I used it instead of .env file.
- In Holidays by Year pagination section, putting 10 buttons in a row for each year were making the group overflow and break into the second row which made it look bad. So I changed the pagination to simple selector component.