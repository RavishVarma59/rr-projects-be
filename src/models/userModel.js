const pool = require("../config/database");

const User = {

    async getAllUsers() {

        const { rows } = await pool.query(
            "SELECT * FROM users"
        );

        return rows;
    },

    async getUserById(id) {

        const { rows } = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );

        return rows[0];
    },

    async createUser(name, email, password) {

        const { rows } = await pool.query(
            `INSERT INTO users
                (name, email, password)
             VALUES
                ($1, $2, $3)
             RETURNING *`,
            [name, email, password]
        );

        return rows[0];
    }

};

module.exports = User;