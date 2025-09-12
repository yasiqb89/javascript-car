import assert from 'node:assert/strict';
import process from 'node:process';
import Car from './models/Car.js';
import { getAllCars } from './api/carApi.js';
import idGenerator from './id-generator.js';

// Lightweight test runner
const tests = [];
function test(name, fn) { tests.push({ name, fn }); }

// Tests
test('Car.info formats fields correctly', () => {
    const c = new Car(1, 'Tesla', 'Model 3', 2022, 'active');
    assert.equal(c.info, '2022 Tesla Model 3 [active]');
});

test('Car.status setter enforces allowed values', () => {
    const c = new Car(2, 'Ford', 'Focus', 2018, 'active');
    c.status = 'sold';
    assert.equal(c.status, 'sold');
    assert.throws(() => { c.status = 'unknown'; }, /Invalid status/);
});

test('Car constructor rejects invalid status', () => {
    assert.throws(() => new Car(3, 'VW', 'Golf', 2017, 'bad'), /Invalid status/);
});

test('toJSON serializes status and fields', () => {
    const c = new Car(4, 'Honda', 'Civic', 2021, 'inactive');
    c.addNote('Oil change due');
    const obj = c.toJSON();
    assert.deepEqual(obj, {
        id: 4,
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        status: 'inactive',
        notes: ['Oil change due']
    });
});

test('Car.parse accepts status or _status', () => {
    const fromStatus = Car.parse({ id: 5, make: 'BMW', model: 'X3', year: 2020, status: 'sold' });
    assert.equal(fromStatus.status, 'sold');

    const fromLegacy = Car.parse({ id: 6, make: 'Audi', model: 'A4', year: 2019, _status: 'active' });
    assert.equal(fromLegacy.status, 'active');
});

test('getAllCars returns Car instances', async () => {
    const cars = await getAllCars();
    assert.ok(Array.isArray(cars));
    for (const c of cars) {
        assert.ok(c instanceof Car);
        assert.match(c.info, /\[[a-z]+\]$/);
    }
});

test('idGenerator increments sequentially', () => {
    const gen = idGenerator(100);
    assert.equal(gen.getNextId(), 100);
    assert.equal(gen.getNextId(), 101);
    assert.equal(gen.getNextId(), 102);
});

// Run tests
let passed = 0;
let failed = 0;
for (const { name, fn } of tests) {
    try {
        const res = fn();
        if (res instanceof Promise) {
            await res;
        }
        console.log(`PASS - ${name}`);
        passed++;
    } catch (err) {
        console.error(`FAIL - ${name}: ${err.message}`);
        failed++;
    }
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exitCode = failed ? 1 : 0;
