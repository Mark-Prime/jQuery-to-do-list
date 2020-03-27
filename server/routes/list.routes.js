const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todolist" ORDER BY "importance" DESC;';
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
    let queryText = 'SELECT * FROM "todolist" WHERE "importance" = $1 ORDER BY "name";';
    pool.query(queryText, [importance]).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting items', error);
            res.sendStatus(500);
        });
});

router.get('/complete', (req, res) => {
    let queryText = `SELECT * FROM "todolist" WHERE "completed" = 'YES' ORDER BY "importance" DESC;`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting items', error);
            res.sendStatus(500);
        });
});

router.get('/incomplete', (req, res) => {
    let queryText = `SELECT * FROM "todolist" WHERE "completed" = 'NO'  ORDER BY "importance" DESC;`;
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
    let newKoala = req.body;
    console.log('Adding New Koala', newKoala);

    let queryText = `INSERT INTO koalas (name, gender, age, ready_to_transfer, notes)
        VALUES($1, $2, $3, $4, $5);`
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyForTransfer, newKoala.notes])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(`Error adding Koala`, error);
            res.sendStatus(500);
        });
})


// PUT
router.put('/:id', (req, res) => {
    let koala = req.body;
    let id = req.params.id;
    let queryText = `UPDATE koalas SET ready_to_transfer = $1
                    WHERE id = $2`;
    pool.query(queryText, [koala.status, id])
        .then(() => {
            console.log(`Updating koala ${id} with `, koala);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error in UPDATE', error);
            res.sendStatus(500);
        })
});


// DELETE
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let queryText = `DELETE FROM "koalas" WHERE "id" = $1;`
    pool.query(queryText, [req.params.id])
        .then(() => {
            console.log('Delete Koala', id);
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
            console.log('Error on Delete Koala', error);
        })
});

module.exports = router;
