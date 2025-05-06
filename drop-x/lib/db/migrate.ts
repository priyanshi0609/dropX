import {migrate}from "drizzle-orm/neon-http/migrator";
import {drizzle} from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";

import * as dotenv from "dotenv";

dotenv.config({path:"./.env"});

if(!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in .env file');

}

async function runMigration() {
    try{
        const sql= neon (process.env.DATABASE_URL!)
        const db= drizzle(sql)
        await migrate(db,{migrationsFolder:"./drizzle"})
        console.log("Migration completed successfully")

    }
    catch (error) {
        console.log ("All migrations are succesfully applied")
        process.exit(0)
    }
}

runMigration()