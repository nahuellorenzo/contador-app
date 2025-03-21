import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL no esta definifa")
}

const connectionString: string = process.env.DATABASE_URL

export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client)