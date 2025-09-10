
class Car {
    #notes = [];

    constructor(id, make, model, year, status = 'active') {
        this.id = id;
        this.make = make;
        this.model = model;
        this.year = year;
        this.status = status;
    }

    addNote(note) {
        this.#notes.push(note);
    }

    getNotes() {
        return [...this.#notes];
    }

    get info() {
        return `${this.year} ${this.make} ${this.model} [${this.status}]`;
    }

    set status(value) {
        const allowed = ['active', 'sold', 'inactive'];
        if (!allowed.includes(value)) {
            throw new Error(`Invalid status: ${value}`);
        }
        this._status = value;
    }

    get status() {
        return this._status;
    }

    static parse(obj) {
        const car = new Car(obj.id, obj.make, obj.model, obj.year, obj.status);

        if (Array.isArray(obj.notes)) {
            obj.notes.forEach(n => car.addNote(n));
        }

        return car;
    }

}

export default Car;