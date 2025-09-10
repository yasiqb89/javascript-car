// Handles all async read/write logic

import { readFile, writeFile } from 'fs/promises';
import Car from '../models/Car.js';

const filePath = new URL('../data/cars.json', import.meta.url);

export async function getAllCars() {
    try {
        const data = await readFile(filePath, 'utf-8');
        const raw = JSON.parse(data);
        return raw.map(obj => Car.parse(obj));

    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}


export async function saveCars(cars) {
    const json = JSON.stringify(cars, null, 2); // pretty formatting with 2-space indent
    await writeFile(filePath, json, 'utf-8');
}


export async function addCar(newCar) {
    const cars = await getAllCars(); // Returns array 
    cars.push(newCar);
    await saveCars(cars); // Save it agian 
}