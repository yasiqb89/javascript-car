// cli/cliHelpers.js
import Car from '../models/Car.js';
import idGenerator from '../id-generator.js';
import { addCar, removeCarWithId, getAllCars, statusUpdate, countCarsByStatus, searchCarsByMake, updateCarDetails } from '../api/carApi.js';

// Keep one shared generator
const idGen = idGenerator();

export async function updateCarStatus(askQuestion) {
    const carId = await askQuestion('Enter car ID: ');
    const newStatus = await askQuestion('Enter new car status: ');
    const allowed = ['active', 'sold', 'inactive'];
    if (!allowed.includes(newStatus.toLowerCase())) {
        console.log(`Invalid status: ${newStatus}. Allowed values are: active, sold, inactive`);
        return;
    }

    await statusUpdate(Number(carId), newStatus);
    console.log(`Car with ID ${carId} updated to status: ${newStatus}`);
}

export async function viewCarDetails(askQuestion) {
    const id = await askQuestion('Enter car ID: ');
    const cars = await getAllCars();

    const car = cars.find(c => c.id === Number(id));
    if (!car) {
        console.log(`No car found with ${id}`);
        return;
    }
    console.log('\n Car Details:');
    console.log(car.info);
    console.log('Notes:', car.getNotes().join(', ') || 'None');
}

export async function listAllCars() {
    const cars = await getAllCars();
    if (!cars || cars.length === 0) {
        console.log('No cars available!');
        return;
    }
    console.log('\n Cars Details');
    cars.forEach(car => {
        console.log(car.info);
    });
}

export async function addCarCli(askQuestion) {
    console.log('\nAdd New Car');

    const make = await askQuestion('Make: ');
    const model = await askQuestion('Model: ');
    const year = Number(await askQuestion('Year: '));
    const status = await askQuestion('Status: ');

    const id = idGen.getNextId();
    const newCar = new Car(id, make, model, year, status);
    await addCar(newCar);

    console.log('Car added successfully!');
}

export async function removeCar(askQuestion) {
    console.log('\nAdd Car ID: ');

    const carId = await askQuestion('Car ID Number: ');
    const allCars = await getAllCars();
    const car = allCars.find(c => c.id === Number(carId));

    if (!car) {
        console.log(`No car found with ${carId}`);
        return;
    }

    await removeCarWithId(Number(carId));
    console.log(`Car with ID ${carId} removed (if found).`);
}

export async function showStatusCounts() {
    const counts = await countCarsByStatus();

    console.log("\nCar Status Counts:");
    Object.entries(counts).forEach(([status, count]) => {
        console.log(`- ${status}: ${count}`);
    });
}

export async function searchCarCli(askQuestion) {
    const make = await askQuestion("Enter car make to search: ");
    const results = await searchCarsByMake(make);

    if (results.length === 0) {
        console.log(`No cars found for make: ${make}`);
        return;
    }

    console.log(`\nCars with make '${make}':`);
    results.forEach(car => console.log(car.info));
}

export async function updateCarDetailsCli(askQuestion) {
    const id = await askQuestion("Enter car id: ");
    const cars = await getAllCars();

    const car = cars.find(c => c.id === Number(id));

    if (!car) {
        console.log(`No car found with ${id}`);
        return;
    }

    console.log(car.info);

    const newMake = await askQuestion("New make (leave blank to keep current): ");
    const newModel = await askQuestion("New model (leave blank to keep current): ");
    const newYear = await askQuestion("New year (leave blank to keep current): ");
    const newStatus = await askQuestion("New status (leave blank to keep current): ");

    const updates = {
        make: newMake,
        model: newModel,
        year: newYear,
        status: newStatus
    }

    await updateCarDetails(Number(id), updates);

}