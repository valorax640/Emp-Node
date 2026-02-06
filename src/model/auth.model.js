import pool from "../config/db.js";
import bcrypt from 'bcrypt';

export const authenticateUser = async (email, password) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM user_master WHERE email = ?',
            [email]
        );
        if (rows.length === 0) {
            return null;
        }
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw error;
    }
};

export const createUser = async (first_name, last_name, email, hashedPassword) => {
    try {
        const [result] = await pool.query(
            'INSERT INTO user_master (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
            [first_name, last_name, email, hashedPassword]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const checkEmailExists = async (email) => {
    try {
        const [rows] = await pool.query(
            'SELECT id FROM user_master WHERE email = ?',
            [email]
        );
        return rows.length > 0;
    } catch (error) {
        console.error('Error checking email existence:', error);
        throw error;
    }
};