const express = require('express');
const toDoRouter = express.Router();

const toDosController = require('../controllers/to-do-controller');

toDoRouter.toDos.index);
toDoRouter.toDos.create);
toDoRouter.get('/new', (req, res) => {
    res.render('toDos/add');
});

toDoRouter.gettoDos.show, (req, res) => {
    res.render('toDos/show', {
        toDo: res.locals.flashcard,
        isShow: true,
    })
});

toDoRouter.get('/:toDos.show, (req, res) => {
    res.render('toDoss/edit', {
        toDo: res.locals.flashcard
    })
});

toDoRouter.updatetoDos.update);
toDoRouter.deletetoDos.delete);

module.exports = toDoRouter;