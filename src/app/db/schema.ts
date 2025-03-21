import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const contador = pgTable('contador', {
  id: serial('id').primaryKey().unique(),
  valor: integer('valor').notNull().default(0),
});

export const contadorHistorial = pgTable("contador_historial", {
    id: serial().primaryKey(),
    accion: text().notNull(),
    timestamp: text().notNull(),
});
