import { pool } from '../config/database.js'

export async function getShows(req, res) {
    try {
        const result = await pool.query("SELECT * from shows ORDER BY id ASC")
        res.status(200).json(result.rows)
    }
    catch (err) {
        res.status(409).json( { error: err.message } )
    }
}

