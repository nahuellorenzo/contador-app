import { drizzle } from 'drizzle-orm/libsql';
import { contador } from "./../db/schema";
import "dotenv/config";

export const db = drizzle(process.env.DB_FILE_NAME!);

(async () => {
  const existing = await db.select().from(contador).get();
  if (!existing) {
    await db.insert(contador).values({ id: 1, valor: 0 });
  }
})();
