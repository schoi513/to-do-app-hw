const db = require('../db/config');

class ToDo {
    constructor({ id, to_do, request_date }) {
        this.id = id || null,
        this.to_do = to_do,
        this.request_date = request_date;
    }

    static getAll() {
        return db
            .query('SELECT * FROM to_dos')
            .then((toDos) => toDos.map((toDo)=> new this(toDo)));
    }

    static getById (id) {
        return db
            .oneOrNone(
                `
                SELECT * FROM toDos
                WHERE id = $1
                `,
                id
            )
            .then((toDo) => {
                if (toDo) return new this(toDo);
                else throw new Error('No toDoList found');
            });
    }

    save() {
        return db
            .one(
                `
                INSERT INTO toDos
                (to_do, request_date)
                VALUES ($/to_do/, $/request_date/)
                RETURNING *
                `,
                    this
            )
            .then((savedToDos)=> Object.assign(this, savedToDos));
    }

    update(changes) {
        Object.assign(this, change);
        return db
            .one(
                `UPDATE toDos SET
                to_do = $/to_do/,
                reuqest_date = $/request_date/
                RETURNING 
                `,
                    this
            )
            .then((updatedToDo) => Object.assign(this, updatedToDo));
    }

    delete() {
        return db.none('DELETE FROM toDos WHERE id = $/id/', this);
    }
    
}

module.exports = ToDo;