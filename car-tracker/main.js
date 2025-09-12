// CLI Entry point
import readline from 'readline';
import Car from './models/Car.js';
import idGenerator from './id-generator.js';
import { addCar, removeCarWithId, statusUpdate } from './api/carApi.js';
import { getAllCars } from './api/carApi.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper function
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

// ID Generator
const idGen = idGenerator();


// CLI menu
async function showMenu() {
    console.log('\n Car Tracker CLI');
    console.log('1. Add a car');
    console.log('2. View car details');
    console.log('3. List all Cars');
    console.log('4. Remove a Car');
    console.log('5. Change car status');
    console.log('6. Exit');

    const choice = await askQuestion('Choose an option: ');

    switch (choice.trim()) {
        case '1':
            await addCarClI();
            break;
        case '2':
            await viewCarDetails();
            break;
        case '3':
            await listAllCars();
            break;
        case '4':
            await removeCar();
            break;
        case '5':
            await updateCarStatus();
            break;
        case '6':
            console.log('Goodbye!');
            rl.close();
            return;
        default:
            console.log('Invalid option');
    }

    // Loop the menu
    showMenu();
}

async function updateCarStatus() {

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

async function viewCarDetails() {
    const id = await askQuestion('Enter car ID: ');
    const cars = await getAllCars();

    const car = cars.find(c => c.id === Number(id));
    if (!car) {
        console.log(`No car found with ${id}`);
        return;
    }
    console.log('\n Car Details:');
    console.log(car.info); // uses the getter
    console.log('Notes:', car.getNotes().join(', ') || 'None');
}

async function listAllCars() {
    const cars = await getAllCars();
    if (!cars) {
        console.log('No cars available!')
        return;
    }
    console.log('\n Cars Details');
    cars.forEach(car => {
        console.log(car.info);
    });
}

async function addCarClI() {
    console.log('\nAdd New Car');

    const make = await askQuestion('Make: ');
    const model = await askQuestion('Model: ');
    const year = Number(await askQuestion('Year: '));
    const status = await askQuestion('Status: ');

    // TODO: Add Validation Here.

    const id = idGen.getNextId(); // Generate new unique ID

    const newCar = new Car(id, make, model, year, status); // Use that ID
    await addCar(newCar);

    console.log('Car added successfully!');

}

async function removeCar() {
    console.log('\nAdd Car ID: ')

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


showMenu();