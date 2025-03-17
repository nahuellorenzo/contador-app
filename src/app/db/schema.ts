import { int, sqliteTable } from "drizzle-orm/sqlite-core";

export const contador = sqliteTable("contador", {
    id: int().primaryKey({ autoIncrement: true }).unique(),
    valor: int().notNull().default(0),
});
