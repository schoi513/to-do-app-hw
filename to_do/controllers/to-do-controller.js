const toDo = require('../models/toDo');

const toDoController = {
    index(req, res, next) {
        toDo.getAll()
            .then((toDos)=> {
                res.render('toDos/index', {
                    toDos: toDos,
                    isShow: false,
                })
            })
            .catch((err)=> next(err));
    },
    show(req, res, next) {
        toDo.getById(req.params.id)
            .then((toDo)=>{
                res.locals.toDo = toDo;
                next();
            })
            .catch((err)=> next(err));
    },

    create(req, res, next) {
        new ToDo({
            to_do: req.body.question,
            request_date: req.body.answer,
        })
        .save()
        .then((toDo)=>{
            res.redirect(`/toDos/${toDo.id}`);
        })
        .catch((err)=> next (err));
    },

    update(req, res, next) {
        ToDo.getById(req.params.id)
            .then((toDo)=> {
                return toDo.update(req.body);
            })
            .then((updatedTodo)=> {
                res.redirect(`/toDos/${updatedTodo.id}`);
            })
            .catch((err)=> next(err));
    },

    delete(req, res, next) {
        Todo.getById(req.params.id)
            .then((toDo)=> {
                return toDo.delete();
            })
            .then(()=> {
                res.redirect(`/toDos`);
            })
            .catch ((err) => next(err));
    },
};

 module.exports = toDoControllers;