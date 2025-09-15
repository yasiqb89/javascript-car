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
    const plain = cars.map(c => (c instanceof Car ? c : Car.parse(c)));
    const json = JSON.stringify(plain, null, 2);
    await writeFile(filePath, json, 'utf-8');
}


export async function addCar(newCar) {
    const cars = await getAllCars(); // Returns array 
    cars.push(newCar);
    await saveCars(cars); // Save it agian 
}


export async function removeCarWithId(id) {
    const cars = await getAllCars();
    const filtered = cars.filter(c => c.id !== id);
    await saveCars(filtered);

}

export async function statusUpdate(id, newStatus) {
    const cars = await getAllCars();
    const car = cars.find(c => c.id == id)

    if (!car) {
        console.log(`No car found with ID ${id}`);
        return;
    }

    car.status = newStatus;
    console.log("Car after update:", car.status);
    await saveCars(cars);

}

export async function countCarsByStatus() {
    const cars = await getAllCars();

    return cars.reduce((acc, car) => {
        acc[car.status] = (acc[car.status] || 0) + 1; //acc["active"] = 1
        return acc;
    }, {});
}

export async function searchCarsByMake(carMake) {
    const cars = await getAllCars();

    // Normalize both sides to lowercase for case-insensitive search
    return cars.filter(car => car.make.toLowerCase() === carMake.toLowerCase());
}