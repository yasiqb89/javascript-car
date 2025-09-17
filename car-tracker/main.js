import readline from 'readline';
import { addCarCli, listAllCars, viewCarDetails, removeCar, updateCarStatus, showStatusCounts, searchCarCli, updateCarDetailsCli } from './cli/cliHelpers.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function showMenu() {
    console.log('\n Car Tracker CLI');
    console.log('1. Add a car');
    console.log('2. View car details');
    console.log('3. List all Cars');
    console.log('4. Remove a Car');
    console.log('5. Update Car Status');
    console.log('6. Count cars by status');
    console.log('7. Search cars by make');
    console.log('8. Update car details');
    console.log('9. Exit');

    const choice = await askQuestion('Choose an option: ');

    switch (choice.trim()) {
        case '1': await addCarCli(askQuestion);
            break;
        case '2': await viewCarDetails(askQuestion);
            break;
        case '3': await listAllCars();
            break;
        case '4': await removeCar(askQuestion);
            break;
        case '5': await updateCarStatus(askQuestion);
            break;
        case '6': await showStatusCounts(askQuestion);
            break;
        case '7': await searchCarCli(askQuestion);
            break;
        case '8': await updateCarDetailsCli(askQuestion);
            break;
        case '9': rl.close();
            return;
        default: console.log('Invalid option');
    }

    showMenu();
}

showMenu();