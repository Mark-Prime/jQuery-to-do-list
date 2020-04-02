const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET

// selects all items from the database and sends them to the client
router.get('/', (req, res) => {
    // creates the SQL request text
    let queryText = 'SELECT * FROM "todolist" ORDER BY "completed", "importance" DESC, "name";';

    // uses pool to get the items from the server using SQL
    pool.query(queryText).then(result => {
        // sends it to the client
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting items', error);
            res.sendStatus(500);
        });
}); // ends get /

// gets items of a specified importance level
router.get('/:id', (req, res) => {
    // the importance level specified
    let importance = req.params.id;

    // SQL text
    let queryText = 'SELECT * FROM "todolist" WHERE "importance" = $1 ORDER BY "completed", "name";';

    // SQL request
    pool.query(queryText, [importance]).then(result => {
        // sends the rows to the client
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting items', error);
            res.sendStatus(500);
        });
}); // ends get /:id

// Gathers completed items
router.get('/sort/complete', (req, res) => {
    // SQL text
    let queryText = `SELECT * FROM "todolist" WHERE completed = $1 ORDER BY "importance" DESC;`;

    // SQL request
    pool.query(queryText, ['YES']).then(result => {
        // sending result to the client
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting items', error);
            res.sendStatus(500);
        });
}); // ends get /sort/complete

// Gathers incomplete items
router.get('/sort/incomplete', (req, res) => {
    // SQL text
    let queryText = `SELECT * FROM "todolist" WHERE completed = 'NO' ORDER BY "importance" DESC;`;

    // SQL request
    pool.query(queryText).then(result => {
        // sending result to the client
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting items', error);
            res.sendStatus(500);
        });
}); // ends get /sort/incomplete

// POST

// Adds a new item to the database
router.post('/', (req, res) => {
    // gets the item information to add
    let newItem = req.body;

    console.log('Adding New Item', newItem);

    // SQL text instructing how to add the item
    let queryText = `INSERT INTO todoList (name, importance, notes)
        VALUES($1, $2, $3);`

    // SQL request to add the item and what information to add
    pool.query(queryText, [newItem.name, newItem.importance, newItem.notes])
        .then(result => {
            res.sendStatus(200); // send OK
        }).catch(error => {
            console.log(`Error adding item`, error);
            res.sendStatus(500);
        });
}) // ends post /

// finds items matching a specific search word/phrase given to it
router.post('/search', (req, res) => {
    // gets the string to search for
    let searchFor = req.body;
    console.log('Searching for', searchFor);

    // SQL requesting items containing the string
    let queryText = `SELECT * FROM "todolist" WHERE "name" ILIKE $1 OR "notes" ILIKE $1 ORDER BY "completed", "importance" DESC, "name";`

    // SQL request
    pool.query(queryText, [`%${searchFor.searchFor}%`])
        .then(result => {
            // sending results to client
            res.send(result.rows);
        }).catch(error => {
            console.log(`Error finding item`, error);
            res.sendStatus(500);
        });
}) // ends post /search


// PUT

// Updates the checked into the be completed or not completed
router.put('/:id', (req, res) => {
    // gets the info from the request
    let item = req.body;

    // gets the ID
    let id = req.params.id;

    // SQL text telling the database to mark the item complete/incomplete
    let queryText = `UPDATE todolist SET completed = $1
                    WHERE id = $2`;

    // SQL query
    pool.query(queryText, [item.status, id])
        .then(() => {
            console.log(`Updating item ${id} to`, item);
            res.sendStatus(200); // sends OK
        }).catch((error) => {
            console.log('Error in UPDATE', error);
            res.sendStatus(500);
        })
}); // ends put /:id


// DELETE

// Deletes an item from the database
router.delete('/:id', (req, res) => {
    // gets the ID
    let id = req.params.id;

    // SQL request
    let queryText = `DELETE FROM "todolist" WHERE "id" = $1;`
    pool.query(queryText, [req.params.id])
        .then(() => {
            console.log('Delete item', id);
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
            console.log('Error on Delete item', error);
        })
}); // ends delete /:id

module.exports = router;
