import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const contador = sqliteTable("contador", {
    id: int().primaryKey({ autoIncrement: true }).unique(),
    valor: int().notNull().default(0),
});

export const contadorHistorial = sqliteTable("contador_historial", {
    id: int().primaryKey({ autoIncrement: true }).unique(),
    accion: text().notNull(),
    timestamp: text().notNull(),
});
