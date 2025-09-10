// CLI Entry point
import readline from 'readline';
import { getAllCars } from './api/carApi.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper function
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}


// CLI menu
async function showMenu() {
    console.log('\n Car Tracker CLI');
    console.log('1. Add a car');
    console.log('2. View car details');
    console.log('3. Exit');

    const choice = await askQuestion('Choose an option: ');

    switch (choice.trim()) {
        case '1':
            console.log('Add car logic will go here...');
            break;
        case '2':
            await viewCarDetails();
            break;
        case '3':
            console.log('Goodbye!');
            rl.close();
            return;
        default:
            console.log('Invalid option');
    }

    // Loop the menu
    showMenu();
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

showMenu();