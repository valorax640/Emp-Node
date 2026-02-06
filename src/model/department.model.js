import pool from "../config/db.js";

export const getDepartments = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM department_master WHERE is_active = '1'");
        return rows;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

export const createDepartment = async (department, manager_id) => {
    try {
        const [result] = await pool.query(
            'INSERT INTO department_master (department, manager_id) VALUES (?, ?)',
            [department, manager_id]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating department:', error);
        throw error;
    }
};

export const updateDepartment = async (id, department, is_active, manager_id) => {
    try {
        const [result] = await pool.query(
            'UPDATE department_master SET department = ?, is_active = ?, manager_id = ? WHERE id = ?',
            [department, is_active, manager_id, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating department:', error);
        throw error;
    }
};

export const getDepartmentById = async (id) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM department_master WHERE id = ?', [id]
        );
        return rows[0];
    } catch (error) {
        console.error('Error fetching department by ID:', error);
        throw error;
    }
};