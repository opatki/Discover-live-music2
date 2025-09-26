import { pool } from "./database.js"
import "./dotenv.js"
import liveMusicData from "../data/liveMusic.js"

async function createShowsTable() {
    const createTableQuery = `
        DROP TABLE IF EXISTS shows;

        CREATE TABLE IF NOT EXISTS shows (
            id SERIAL PRIMARY KEY,
            eventName VARCHAR(255) NOT NULL,
            artists TEXT[] NOT NULL,
            dateTime VARCHAR(100) NOT NULL,
            venue VARCHAR(255) NOT NULL,
            genre VARCHAR(100) NOT NULL,
            ticketPrice VARCHAR(50), -- can be NULL if free
            image VARCHAR(500) -- store the image URL
        )
    `
    
    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 shows table created successfully')
    }
    catch (err) {
        console.error('⚠️ error creating shows table', err)
    }

}

async function seedShowsTable() {
    await createShowsTable()
    liveMusicData.forEach((show) => {
        const values = [
            show.id,
            show.eventName,
            show.artists,
            show.dateTime,
            show.venue,
            show.genre,
            show.ticketPrice,
            show.image        
        ]
        const insertQuery = {
            text: 'INSERT INTO shows ( id, eventName, artists, dateTime, venue, genre, ticketPrice, image ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
        }

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting show', err)
                return
            }

            console.log(`✅ ${show.eventName} added successfully`)
        })
    })
}

seedShowsTable()