const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg'); 

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());


const pool = new Pool({
    user: 'postgres', //postgres username is postgres
    host: 'localhost', // running on localhost
    database: 'prjDB', //we create the database as prjdb
    password: 'pass', // when you install postgres it will ask and this is that pass
    port: '5432'  //default port of postgres
});

pool.connect((err) => {
    if (err) {
        console.log('error occur', err);
    } else {
        console.log('connect to database');
    }
});

app.post('/submit', async (req, res) => {
    const { name, address, number, gmail } = req.body;

    try {
        const query = `
        INSERT INTO prj (name, address, number, gmail)
        VALUES ($1, $2, $3, $4)`;
        await pool.query(query, [name, address, number, gmail]);
        res.status(200).json({ message: 'Form submit successful' });
    } catch (error) {
        console.error('Error in inserting the data in database', error);
        res.status(500).json({ error: 'Error submission' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

