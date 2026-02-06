import app from './src/app.js';
import dotenv from 'dotenv';
import pool from './src/config/db.js';
dotenv.config({ debug: false, override: false, quiet: true });
const PORT = process.env.PORT || 5000;

pool.getConnection()
    .then(connection => {
        console.log('Database connection established:', process.env.DB_NAME);
        connection.release();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});