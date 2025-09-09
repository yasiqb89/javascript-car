// CLI Entry point
import readline from 'readline';

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
    console.log('2. View all cars');
    console.log('3. Exit');

    const choice = await askQuestion('Choose an option: ');

    switch (choice.trim()) {
        case '1':
            console.log('Add car logic will go here...');
            break;
        case '2':
            console.log('View cars logic will go here...');
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

showMenu();