# Car Tracker CLI

A simple Node.js CLI for tracking cars. Supports adding, viewing, listing, and removing cars, with data persisted to a JSON file.

## Requirements

- Node.js 18+ (ES modules enabled)

## Getting Started

- Run the CLI: `node car-tracker/main.js`

## Features

- Add a car with make, model, year, and status.
- View details for a specific car by ID.
- List all cars.
- Remove a car by ID.
- Input validation for common mistakes.
- Status persistence using a `status` field in JSON.

## CLI Usage

When you start the app you’ll see a menu:

1. Add a car
2. View car details
3. List all Cars
4. Remove a Car
5. Update Car Status
6. Count cars by status
7. Search cars by make
8. Update car details
9. Add car notes
10. Exit

Follow the prompts for each action.

## Data Storage

- Data is stored at `car-tracker/data/cars.json`.
- Cars are saved as plain objects with: `id`, `make`, `model`, `year`, `status`, and optional `notes`.
- The model serializes `status` (not `_status`) ensuring updates persist correctly.

## Model and API

- `car-tracker/models/Car.js`
  - Validates `status` against: `active`, `sold`, `inactive`.
  - Provides `.info` getter and notes management.
  - Implements `toJSON()` for clean persistence.
- `car-tracker/api/carApi.js`
  - `getAllCars()`: loads and parses cars from JSON.
  - `addCar(car)`: appends and saves a car.
  - `removeCarWithId(id)`: removes a car by ID and saves.

## ID Generation

- `car-tracker/id-generator.js` provides a simple incremental ID generator per run.

## Validation

- Make/Model: required (non-empty after trim).
- Year: integer between 1886 and next year.
- Status: `active` (default if blank), `sold`, or `inactive`.

## Notes

- If you manually edit `cars.json`, keep the `status` field valid.
- To reset data, you can delete the JSON file contents and use the CLI to add fresh entries.

## Project Structure

```
car-tracker/
├── api/
│   └── carApi.js
├── cli/
│   └── cliHelpers.js
├── models/
│   └── Car.js
├── data/
│   └── cars.json
├── id-generator.js
├── main.js
└── README.md
```
