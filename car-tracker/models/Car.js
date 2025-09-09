// Class with describe(), updateStatus(), addNote()

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

    get Info() {
        return `${this.year} ${this.make} ${this.model} [${this.status}]`;
    }

    set status(value) {
        const allowed = ['active', 'sold', 'inactive'];
        if (!allowed.includes(value)) {
            throw new Error(`Invalid status': ${value}`);
        }
        this._status = value;
    }

    get status() {
        return this.status;
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }

    describe() {
        return `${this.year} ${this.make} ${this.model} [${this.status}]`;
    }

}

export default Car;