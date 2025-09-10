import { readFile } from 'fs/promises';
import Car from './models/Car.js';
import { getAllCars } from './api/carApi.js';

const filePath = new URL('./data/cars.json', import.meta.url);

const cars = await getAllCars();
cars.forEach(c => {
    console.log(c.info);
    // c.addNote('Debug log!');
    // console.log(c.getNotes());
});

// const data = await readFile(filePath, 'utf-8');
// const raw = JSON.parse(data);

// // Convert each object to a Car instance
// const cars = raw.map(obj => Car.parse(obj));

// // Test: use Car methods
// cars.forEach(c => {
//     console.log(c.info);          // uses getter
//     c.addNote('Test note');       // uses private method
//     console.log(c.getNotes());    // show updated notes
// });


