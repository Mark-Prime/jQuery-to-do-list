const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todolist" ORDER BY "completed", "importance" DESC, "name";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting items', error);
            res.sendStatus(500);
        });
});

router.get('/:id', (req, res) => {
    let importance = req.params.id;
    let queryText = 'SELECT * FROM "todolist" WHERE "importance" = $1 ORDER BY "completed", "name";';
    pool.query(queryText, [importance]).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting items', error);
            res.sendStatus(500);
        });
});

router.get('/sort/complete', (req, res) => {
    let queryText = `SELECT * FROM "todolist" WHERE completed = $1 ORDER BY "importance" DESC;`;
    pool.query(queryText, ['YES']).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting items', error);
            res.sendStatus(500);
        });
});

router.get('/sort/incomplete', (req, res) => {
    let queryText = `SELECT * FROM "todolist" WHERE completed = 'NO' ORDER BY "importance" DESC;`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting items', error);
            res.sendStatus(500);
        });
});

// POST
router.post('/', (req, res) => {
    let newItem = req.body;
    console.log('Adding New Item', newItem);

    let queryText = `INSERT INTO todoList (name, importance, notes)
        VALUES($1, $2, $3);`
    pool.query(queryText, [newItem.name, newItem.importance, newItem.notes])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(`Error adding item`, error);
            res.sendStatus(500);
        });
})

router.post('/search', (req, res) => {
    let searchFor = req.body;
    console.log('Searching for', searchFor);

    let queryText = `SELECT * FROM "todolist" WHERE "name" ILIKE $1 OR "notes" ILIKE $1 ORDER BY "completed", "importance" DESC, "name";`
    pool.query(queryText, [`%${searchFor.searchFor}%`])
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log(`Error finding item`, error);
            res.sendStatus(500);
        });
})


// PUT
router.put('/:id', (req, res) => {
    let item = req.body;
    let id = req.params.id;
    let queryText = `UPDATE todolist SET completed = $1
                    WHERE id = $2`;
    pool.query(queryText, [item.status, id])
        .then(() => {
            console.log(`Updating item ${id} to`, item);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error in UPDATE', error);
            res.sendStatus(500);
        })
});


// DELETE
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let queryText = `DELETE FROM "todolist" WHERE "id" = $1;`
    pool.query(queryText, [req.params.id])
        .then(() => {
            console.log('Delete item', id);
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
            console.log('Error on Delete item', error);
        })
});

module.exports = router;
